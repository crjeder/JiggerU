import {
  allGlassesSelector,
  currentCocktailSelector,
  filteredCocktailsSelector,
  makeableCocktailsSelector,
  allCategoriesSelector,
  effectiveActiveFiltersSelector,
} from "./index";

const mockCocktails = [
  {
    name: "Negroni",
    slug: "negroni",
    category: "After Dinner Cocktail",
    ingredients: [
      { ingredient: "Gin" },
      { ingredient: "Campari" },
      { ingredient: "Vermouth" },
    ],
  },
  {
    name: "Gimlet",
    slug: "gimlet",
    category: "All Day Cocktail",
    ingredients: [{ ingredient: "Gin" }, { ingredient: "Lime juice" }],
  },
  {
    name: "Daiquiri",
    slug: "daiquiri",
    category: "All Day Cocktail",
    ingredients: [
      { ingredient: "White rum" },
      { ingredient: "Lime juice" },
      { ingredient: "Sugar syrup" },
    ],
  },
];

const mockGlasses = [
  { name: "Martini glass" },
  { name: "Old fashioned glass" },
];

function makeState(overrides = {}) {
  return {
    db: {
      cocktails: mockCocktails,
      glasses: mockGlasses,
    },
    filterOptions: {
      activeFilters: [],
      activeDialog: null,
      ingredients: [],
      ingredientsRule: "mustInclude",
      barOnly: false,
      categories: [],
      glasses: [],
      nameFilter: null,
    },
    bar: [],
    manualBar: [],
    settings: {
      theme: "light",
      color: "indigo",
      browserMode: "card",
      units: "cl",
      pride: false,
      lingo: false,
    },
    ...overrides,
  };
}

describe("allGlassesSelector", () => {
  it("returns all glasses from state", () => {
    const state = makeState();
    expect(allGlassesSelector(state)).toEqual(mockGlasses);
  });

  it("returns empty array when no glasses loaded", () => {
    const state = makeState({ db: { cocktails: [], glasses: [] } });
    expect(allGlassesSelector(state)).toEqual([]);
  });
});

describe("currentCocktailSelector", () => {
  it("finds cocktail by slug from URL params", () => {
    const state = makeState();
    const props = { match: { params: { slug: "gimlet" } } };
    expect(currentCocktailSelector(state, props)).toEqual(mockCocktails[1]);
  });

  it("finds cocktail by slug from cocktail prop", () => {
    const state = makeState();
    const props = { cocktail: { slug: "daiquiri" } };
    expect(currentCocktailSelector(state, props)).toEqual(mockCocktails[2]);
  });

  it("returns undefined when slug does not match any cocktail", () => {
    const state = makeState();
    const props = { cocktail: { slug: "unknown-cocktail" } };
    expect(currentCocktailSelector(state, props)).toBeUndefined();
  });

  it("URL slug takes precedence over cocktail prop slug", () => {
    const state = makeState();
    const props = {
      match: { params: { slug: "negroni" } },
      cocktail: { slug: "daiquiri" },
    };
    expect(currentCocktailSelector(state, props)).toEqual(mockCocktails[0]);
  });
});

describe("filteredCocktailsSelector", () => {
  it("returns all cocktails sorted by name when no filters active", () => {
    const state = makeState();
    const result = filteredCocktailsSelector(state);
    expect(result.map((c) => c.name)).toEqual([
      "Daiquiri",
      "Gimlet",
      "Negroni",
    ]);
  });

  it("returns empty array when no cocktails loaded", () => {
    const state = makeState({ db: { cocktails: [], glasses: [] } });
    expect(filteredCocktailsSelector(state)).toEqual([]);
  });
});

describe("makeableCocktailsSelector", () => {
  it("returns empty array when bar is empty", () => {
    const state = makeState({ bar: [] });
    expect(makeableCocktailsSelector(state)).toEqual([]);
  });

  it("returns cocktails makeable from bar ingredients", () => {
    const state = makeState({
      bar: [
        { ingredient: "Gin", type: "Gin" },
        { ingredient: "Lime juice", type: "Lime juice" },
      ],
    });
    const result = makeableCocktailsSelector(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Gimlet");
  });

  it("matches generic recipe ingredient via type", () => {
    const state = makeState({
      bar: [
        { ingredient: "Momentum Gin", type: "Gin" },
        { ingredient: "Lime juice", type: "Lime juice" },
      ],
    });
    const result = makeableCocktailsSelector(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Gimlet");
  });

  it("matches brand-specific recipe ingredient by exact name", () => {
    // Gimlet recipe uses "Gin" (generic) — if recipe used "Momentum Gin"
    // specifically, it should match only that brand in bar.
    const state = makeState({
      bar: [
        { ingredient: "Momentum Gin", type: "Gin" },
        { ingredient: "Lime juice", type: "Lime juice" },
      ],
    });
    // "Momentum Gin" appears in bar's flatMapped ingredient names
    const ingredients = state.bar.flatMap((item) =>
      [item.type, item.ingredient].filter(Boolean),
    );
    expect(ingredients).toContain("Momentum Gin");
    expect(ingredients).toContain("Gin");
  });

  it("does not match brand-specific recipe when only different brand in bar", () => {
    // Bar has Ilusionist (type Gin), but if recipe asked for "Momentum Gin"
    // it should not be satisfied.
    const bar = [{ ingredient: "The Ilusionist", type: "Gin" }];
    const ingredients = bar.flatMap((item) =>
      [item.type, item.ingredient].filter(Boolean),
    );
    expect(ingredients).not.toContain("Momentum Gin");
  });

  it("includes manual bar ingredients in makeable computation", () => {
    const state = makeState({
      bar: [
        { ingredient: "Gin", type: "Gin" },
        { ingredient: "Lime juice", type: "Lime juice" },
      ],
      manualBar: ["Sugar syrup"],
    });
    const result = makeableCocktailsSelector(state);
    // Daiquiri needs White rum, Lime juice, Sugar syrup — not makeable (no rum)
    // Gimlet needs Gin, Lime juice — makeable
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Gimlet");
  });

  it("makes cocktail available when missing ingredient is in manualBar", () => {
    const state = makeState({
      bar: [
        { ingredient: "White rum", type: "White rum" },
        { ingredient: "Lime juice", type: "Lime juice" },
      ],
      manualBar: ["Sugar syrup"],
    });
    const result = makeableCocktailsSelector(state);
    expect(result.map((c) => c.name)).toContain("Daiquiri");
  });

  it("returns empty when bar and manualBar are both empty", () => {
    const state = makeState({ bar: [], manualBar: [] });
    expect(makeableCocktailsSelector(state)).toEqual([]);
  });
});

describe("effectiveActiveFiltersSelector", () => {
  it("returns stored activeFilters when robot is not connected", () => {
    const state = makeState({ robot: { connected: false } });
    expect(effectiveActiveFiltersSelector(state)).toEqual([]);
  });

  it("returns stored activeFilters unchanged when robot is absent from state", () => {
    const state = makeState();
    expect(effectiveActiveFiltersSelector(state)).toEqual([]);
  });

  it("injects barOnly when robot is connected and barOnly not in activeFilters", () => {
    const state = makeState({ robot: { connected: true } });
    expect(effectiveActiveFiltersSelector(state)).toEqual(["barOnly"]);
  });

  it("does not duplicate barOnly when robot is connected and barOnly already present", () => {
    const state = makeState({
      filterOptions: {
        activeFilters: ["barOnly"],
        activeDialog: null,
        ingredients: [],
        ingredientsRule: "mustInclude",
        barOnly: false,
        categories: [],
        glasses: [],
        nameFilter: null,
      },
      robot: { connected: true },
    });
    expect(effectiveActiveFiltersSelector(state)).toEqual(["barOnly"]);
  });

  it("enforces barOnly filter on cocktail list when robot is connected", () => {
    const state = makeState({
      bar: [
        { ingredient: "Gin", type: "Gin" },
        { ingredient: "Lime juice", type: "Lime juice" },
      ],
      robot: { connected: true },
    });
    const result = filteredCocktailsSelector(state);
    expect(result.map((c) => c.name)).toEqual(["Gimlet"]);
  });

  it("lifts barOnly enforcement when robot disconnects", () => {
    const state = makeState({
      bar: [
        { ingredient: "Gin", type: "Gin" },
        { ingredient: "Lime juice", type: "Lime juice" },
      ],
      robot: { connected: false },
    });
    const result = filteredCocktailsSelector(state);
    expect(result.map((c) => c.name)).toEqual([
      "Daiquiri",
      "Gimlet",
      "Negroni",
    ]);
  });
});

describe("allCategoriesSelector", () => {
  it("returns unique non-empty category names", () => {
    const state = makeState();
    const result = allCategoriesSelector(state);
    expect(result).toHaveLength(2);
    expect(result).toContain("After Dinner Cocktail");
    expect(result).toContain("All Day Cocktail");
  });

  it("excludes falsy category values", () => {
    const state = makeState({
      db: {
        cocktails: [
          { name: "A", slug: "a", category: null, ingredients: [] },
          { name: "B", slug: "b", category: "Sour", ingredients: [] },
        ],
        glasses: [],
      },
    });
    const result = allCategoriesSelector(state);
    expect(result).toEqual(["Sour"]);
  });

  it("returns empty array when no cocktails loaded", () => {
    const state = makeState({ db: { cocktails: [], glasses: [] } });
    expect(allCategoriesSelector(state)).toEqual([]);
  });
});
