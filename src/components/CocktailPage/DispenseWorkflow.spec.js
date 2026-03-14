import { resolveDispensableIngredients } from "./DispenseWorkflow";

const robotConfig = {
  liquids: [
    { id: "slot1", name: "Gordon's Gin" },
    { id: "slot2", name: "Momentum Holy Basil Gin" },
    { id: "slot3", name: "Campari" },
  ],
  glass_types: [],
};

const bar = [
  { ingredient: "Gordon's Gin", type: "Gin" },
  { ingredient: "Momentum Holy Basil Gin", type: "Gin" },
  { ingredient: "Campari", type: "Campari" },
];

describe("resolveDispensableIngredients", () => {
  it("returns empty lists when robotConfig is missing", () => {
    const cocktail = {
      ingredients: [{ ingredient: "Gin", amount: 4, unit: "cl" }],
    };
    expect(resolveDispensableIngredients(cocktail, null, bar)).toEqual({
      dispensable: [],
      manual: [],
    });
    expect(resolveDispensableIngredients(cocktail, {}, bar)).toEqual({
      dispensable: [],
      manual: [],
    });
  });

  describe("label-first matching", () => {
    it("prefers bar entry matching label over generic type match", () => {
      const cocktail = {
        ingredients: [
          {
            ingredient: "Gin",
            label: "Momentum Holy Basil Gin",
            amount: 4,
            unit: "cl",
          },
        ],
      };
      const { dispensable } = resolveDispensableIngredients(
        cocktail,
        robotConfig,
        bar,
      );
      expect(dispensable).toHaveLength(1);
      expect(dispensable[0].liquid_id).toBe("slot2");
    });

    it("falls back to type match when label is absent from bar", () => {
      const cocktail = {
        ingredients: [
          { ingredient: "Gin", label: "Hendrick's Gin", amount: 4, unit: "cl" },
        ],
      };
      const { dispensable } = resolveDispensableIngredients(
        cocktail,
        robotConfig,
        bar,
      );
      // Falls back — picks first Gin type match (slot1)
      expect(dispensable).toHaveLength(1);
      expect(dispensable[0].liquid_id).toBe("slot1");
    });

    it("uses type match when no label is present", () => {
      const cocktail = {
        ingredients: [{ ingredient: "Gin", amount: 4, unit: "cl" }],
      };
      const { dispensable } = resolveDispensableIngredients(
        cocktail,
        robotConfig,
        bar,
      );
      expect(dispensable).toHaveLength(1);
      expect(dispensable[0].liquid_id).toBe("slot1");
    });
  });

  describe("manual fallback", () => {
    it("moves ingredient to manual when not in bar", () => {
      const cocktail = {
        ingredients: [{ ingredient: "Lime Juice", amount: 2, unit: "cl" }],
      };
      const { dispensable, manual } = resolveDispensableIngredients(
        cocktail,
        robotConfig,
        bar,
      );
      expect(dispensable).toHaveLength(0);
      expect(manual).toHaveLength(1);
      expect(manual[0].ingredient).toBe("Lime Juice");
    });

    it("splits dispensable and manual ingredients correctly", () => {
      const cocktail = {
        ingredients: [
          { ingredient: "Campari", amount: 3, unit: "cl" },
          { ingredient: "Lime Juice", amount: 2, unit: "cl" },
        ],
      };
      const { dispensable, manual } = resolveDispensableIngredients(
        cocktail,
        robotConfig,
        bar,
      );
      expect(dispensable).toHaveLength(1);
      expect(dispensable[0].liquid_id).toBe("slot3");
      expect(manual).toHaveLength(1);
    });
  });
});
