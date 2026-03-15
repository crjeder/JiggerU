import React from "react";
import { act } from "react-test-renderer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import useManualIngredients from "./useManualIngredients";
import * as actionTypes from "../actionTypes";

function Fixture() {
  useManualIngredients();
  return null;
}

function makeStore() {
  const dispatched = [];
  const store = createStore((s = {}, action) => {
    dispatched.push(action);
    return s;
  });
  return { store, dispatched };
}

function renderFixture(store) {
  act(() => {
    renderer.create(
      <Provider store={store}>
        <Fixture />
      </Provider>,
    );
  });
}

beforeEach(() => {
  jest.resetAllMocks();
  global.fetch = jest.fn();
  jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  console.warn.mockRestore();
});

describe("useManualIngredients", () => {
  it("dispatches MANUAL_INGREDIENTS_LOADED on success", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(["Basil", "Mint"]),
    });

    const { store, dispatched } = makeStore();
    renderFixture(store);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const loaded = dispatched.find(
      (a) => a.type === actionTypes.MANUAL_INGREDIENTS_LOADED,
    );
    expect(loaded).toBeDefined();
    expect(loaded.payload).toEqual(["Basil", "Mint"]);
  });

  it("does nothing on 404", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    const { store, dispatched } = makeStore();
    renderFixture(store);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const loaded = dispatched.find(
      (a) => a.type === actionTypes.MANUAL_INGREDIENTS_LOADED,
    );
    expect(loaded).toBeUndefined();
    expect(console.warn).not.toHaveBeenCalled();
  });

  it("warns and does nothing on fetch error", async () => {
    global.fetch.mockRejectedValue(new Error("network failure"));

    const { store, dispatched } = makeStore();
    renderFixture(store);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const loaded = dispatched.find(
      (a) => a.type === actionTypes.MANUAL_INGREDIENTS_LOADED,
    );
    expect(loaded).toBeUndefined();
    expect(console.warn).toHaveBeenCalledWith(
      "[useManualIngredients]",
      "Failed to load:",
      expect.any(Error),
    );
  });

  it("warns and does nothing on non-404 error status", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { store, dispatched } = makeStore();
    renderFixture(store);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    const loaded = dispatched.find(
      (a) => a.type === actionTypes.MANUAL_INGREDIENTS_LOADED,
    );
    expect(loaded).toBeUndefined();
    expect(console.warn).toHaveBeenCalled();
  });
});
