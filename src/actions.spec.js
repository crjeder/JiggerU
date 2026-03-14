import * as actions from "./actions";
import * as actionTypes from "./actionTypes";

jest.mock("./services/cocktailDBAPI.service", () => ({
  fetchCocktailEnrichment: jest.fn(),
}));
import { fetchCocktailEnrichment } from "./services/cocktailDBAPI.service";

describe("simple action creators", () => {
  it("loadCocktails returns correct action", () => {
    const payload = [{ name: "Negroni" }];
    expect(actions.loadCocktails(payload)).toEqual({
      type: actionTypes.LOAD_COCKTAILS,
      payload,
    });
  });

  it("loadIngredients returns correct action", () => {
    const payload = [{ name: "Gin" }];
    expect(actions.loadIngredients(payload)).toEqual({
      type: actionTypes.LOAD_INGREDIENTS,
      payload,
    });
  });

  it("loadGlasses returns correct action", () => {
    const payload = [{ name: "Martini glass" }];
    expect(actions.loadGlasses(payload)).toEqual({
      type: actionTypes.LOAD_GLASSES,
      payload,
    });
  });

  it("updateFilter returns correct action", () => {
    const payload = { barOnly: true };
    expect(actions.updateFilter(payload)).toEqual({
      type: actionTypes.UPDATE_FILTER,
      payload,
    });
  });

  it("activateFilterDialog returns correct action", () => {
    expect(actions.activateFilterDialog("byIngredient")).toEqual({
      type: actionTypes.ACTIVATE_FILTER_DIALOG,
      payload: "byIngredient",
    });
  });

  it("closeFilterDialog returns correct action with no payload", () => {
    expect(actions.closeFilterDialog()).toEqual({
      type: actionTypes.CLOSE_FILTER_DIALOG,
    });
  });

  it("updateSettings returns correct action", () => {
    const payload = { units: "oz" };
    expect(actions.updateSettings(payload)).toEqual({
      type: actionTypes.UPDATE_SETTINGS,
      payload,
    });
  });

  it("togglePride returns correct action with no payload", () => {
    expect(actions.togglePride()).toEqual({ type: actionTypes.TOGGLE_PRIDE });
  });

  it("toggleLingo returns correct action with no payload", () => {
    expect(actions.toggleLingo()).toEqual({ type: actionTypes.TOGGLE_LINGO });
  });
});

describe("robot action creators", () => {
  it("robotConnected returns correct action", () => {
    expect(actions.robotConnected()).toEqual({
      type: actionTypes.ROBOT_CONNECTED,
    });
  });

  it("robotDisconnected returns correct action", () => {
    expect(actions.robotDisconnected()).toEqual({
      type: actionTypes.ROBOT_DISCONNECTED,
    });
  });

  it("robotStateChanged returns correct action", () => {
    const state = { status: "idle" };
    expect(actions.robotStateChanged(state)).toEqual({
      type: actionTypes.ROBOT_STATE_CHANGED,
      payload: state,
    });
  });

  it("robotConfigLoaded returns correct action", () => {
    const config = { pumps: 6 };
    expect(actions.robotConfigLoaded(config)).toEqual({
      type: actionTypes.ROBOT_CONFIG_LOADED,
      payload: config,
    });
  });

  it("robotJobUpdated returns correct action", () => {
    expect(actions.robotJobUpdated("job-42")).toEqual({
      type: actionTypes.ROBOT_JOB_UPDATED,
      payload: "job-42",
    });
  });

  it("robotBarSynced returns correct action", () => {
    const barEntries = [{ ingredient: "Gin", type: "Gin" }];
    const unresolvedLiquids = [{ id: 1, name: "Mystery liquid" }];
    expect(actions.robotBarSynced(barEntries, unresolvedLiquids)).toEqual({
      type: actionTypes.ROBOT_BAR_SYNCED,
      payload: { barEntries, unresolvedLiquids },
    });
  });
});

describe("enrichCocktail thunk", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    fetchCocktailEnrichment.mockClear();
  });

  it("does nothing if cocktail is already enriched", async () => {
    const cocktail = { name: "Negroni", enriched: true };
    await actions.enrichCocktail(cocktail)(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("does nothing if cocktail is currently enriching", async () => {
    const cocktail = { name: "Negroni", enriching: true };
    await actions.enrichCocktail(cocktail)(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("does nothing if cocktail enrichment previously failed", async () => {
    const cocktail = { name: "Negroni", enrichmentFailed: true };
    await actions.enrichCocktail(cocktail)(dispatch);
    expect(dispatch).not.toHaveBeenCalled();
  });

  it("dispatches start and finish actions on successful enrichment", async () => {
    const enrichment = { image: "http://example.com/img.jpg", variants: [] };
    fetchCocktailEnrichment.mockResolvedValue(enrichment);

    const cocktail = { name: "Negroni" };
    await actions.enrichCocktail(cocktail)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: actionTypes.START_ENRICH_COCKTAIL,
      payload: "Negroni",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: actionTypes.FINISH_ENRICH_COCKTAIL,
      payload: { cocktailName: "Negroni", enrichment },
    });
  });

  it("dispatches start and fail actions when enrichment throws", async () => {
    fetchCocktailEnrichment.mockRejectedValue(new Error("Network error"));

    const cocktail = { name: "Negroni" };
    await actions.enrichCocktail(cocktail)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: actionTypes.START_ENRICH_COCKTAIL,
      payload: "Negroni",
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: actionTypes.FAIL_ENRICH_COCKTAIL,
      payload: { cocktailName: "Negroni", error: "Network error" },
    });
  });
});
