import React from "react";
import renderer from "react-test-renderer";
import { CocktailPage } from "./CocktailPage";
import store from "../store";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { noop } from "lodash";
import { loadDatabase } from "../utilities/db.utils";

beforeAll(async () => {
  await loadDatabase(store);
});

beforeAll(() => {
  // jsdom does not implement scrollTo so we need to mock it.
  window.scrollToMemo = window.scrollTo;
  window.scrollTo = noop;
});

afterAll(() => {
  window.scrollTo = window.scrollToMemo;
  delete window.scrollToMemo;
});

it("does not explode when rendered", async () => {
  const allCocktails = store.getState().db.cocktails;
  const cocktail = allCocktails[0];

  const tree = renderer.create(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/cocktails/${cocktail.slug}`]}>
        <Routes>
          <Route
            path="/cocktails/:slug"
            element={<CocktailPage allCocktails={allCocktails} />}
          />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  expect(tree).toMatchSnapshot();
});
