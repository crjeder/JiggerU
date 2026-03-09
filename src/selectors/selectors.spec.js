import {
  allGlassesSelector,
  isFavouriteSelector,
  currentCocktailSelector,
  filteredCocktailsSelector,
  makeableCocktailsSelector,
  allCategoriesSelector,
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
    favourites: [],
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

describe("isFavouriteSelector", () => {
  it("returns true when cocktail slug is in favourites", () => {
    const state = makeState({ favourites: ["negroni", "gimlet"] });
    const props = { cocktail: { slug: "negroni" } };
    expect(isFavouriteSelector(state, props)).toBe(true);
  });

  it("returns false when cocktail slug is not in favourites", () => {
    const state = makeState({ favourites: ["gimlet"] });
    const props = { cocktail: { slug: "negroni" } };
    expect(isFavouriteSelector(state, props)).toBe(false);
  });

  it("returns false when favourites list is empty", () => {
    const state = makeState({ favourites: [] });
    const props = { cocktail: { slug: "negroni" } };
    expect(isFavouriteSelector(state, props)).toBe(false);
  });

  it("resolves slug from URL match params when present", () => {
    const state = makeState({ favourites: ["daiquiri"] });
    const props = { match: { params: { slug: "daiquiri" } } };
    expect(isFavouriteSelector(state, props)).toBe(true);
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
        { ingredient: "Gin", source: "manual" },
        { ingredient: "Lime juice", source: "manual" },
      ],
    });
    const result = makeableCocktailsSelector(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Gimlet");
  });

  it("handles bar items with type property", () => {
    const state = makeState({
      bar: [
        { ingredient: "Gin", type: "Gin", source: "robot" },
        { ingredient: "Lime juice", source: "manual" },
      ],
    });
    const result = makeableCocktailsSelector(state);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Gimlet");
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
