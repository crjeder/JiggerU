import produce from "immer";
import { loadPersistedState } from "../utilities/persistence";
import { hasDialog } from "../filterConfig";
import defaultAliases from "../data/ingredientAliases.json";

import * as actionTypes from "../actionTypes";

const defaultState = {
  db: {
    cocktails: [],
    ingredients: [],
    glasses: [],
  },
  filterOptions: {
    activeFilters: [],
    activeDialog: null,
    ingredients: [],
    ingredientsRule: "mustInclude",
    barOnly: false,
    categories: [],
    glasses: [],
  },
  bar: [],
  manualBar: [],
  settings: {
    browserMode: "card",
    units: "cl",
    pride: false,
    lingo: false,
    robot: {
      url: "",
      token: "",
      ingredientAliases: defaultAliases,
    },
  },
  robot: {
    connected: false,
    robotState: null,
    robotConfig: null,
    activeJobId: null,
    unresolvedLiquids: [],
  },
};

const persistedState = loadPersistedState();

const configSettings = (window.__APP_CONFIG__ || {}).settings || {};

const initialState = produce(
  { ...defaultState, ...persistedState },
  (draft) => {
    // Settings are seeded from config.json (via window.__APP_CONFIG__), not localStorage
    draft.settings = {
      ...defaultState.settings,
      ...configSettings,
      robot: {
        ...defaultState.settings.robot,
        ...(configSettings.robot || {}),
      },
    };

    // Robot slice is never persisted — always starts fresh
    draft.robot = defaultState.robot;
  },
);

/**
 * Main reducer
 */
export default (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.LOAD_COCKTAILS:
        draft.db.cocktails = action.payload;
        break;
      case actionTypes.LOAD_INGREDIENTS:
        draft.db.ingredients = action.payload;
        break;
      case actionTypes.LOAD_GLASSES:
        draft.db.glasses = action.payload;
        break;
      case actionTypes.UPDATE_FILTER:
        draft.filterOptions = { ...draft.filterOptions, ...action.payload };
        break;
      case actionTypes.ACTIVATE_FILTER_DIALOG:
        draft.filterOptions.activeDialog =
          action.payload && hasDialog(action.payload) ? action.payload : null;
        break;
      case actionTypes.CLOSE_FILTER_DIALOG:
        draft.filterOptions.activeDialog = null;
        break;
      case actionTypes.TOGGLE_PRIDE:
        draft.settings.pride = !draft.settings.pride;
        break;
      case actionTypes.TOGGLE_LINGO:
        draft.settings.lingo = !draft.settings.lingo;
        break;
      case actionTypes.UPDATE_SETTINGS:
        draft.settings = { ...draft.settings, ...action.payload };
        break;
      case actionTypes.START_ENRICH_COCKTAIL:
        draft.db.cocktails.find((c) => c.name === action.payload).enriching =
          true;
        break;
      case actionTypes.FAIL_ENRICH_COCKTAIL:
        Object.assign(
          draft.db.cocktails.find(
            (c) => c.name === action.payload.cocktailName,
          ),
          {
            enriching: false,
            enrichmentFailed: true,
            enrichmentFailedError: action.payload.error.message,
          },
        );
        break;
      case actionTypes.FINISH_ENRICH_COCKTAIL:
        Object.assign(
          draft.db.cocktails.find(
            (c) => c.name === action.payload.cocktailName,
          ),
          {
            enriching: false,
            enriched: true,
            enrichment: action.payload.enrichment,
          },
        );
        break;

      // Robot slice
      case actionTypes.ROBOT_CONNECTED:
        draft.robot.connected = true;
        break;
      case actionTypes.ROBOT_DISCONNECTED:
        draft.robot.connected = false;
        draft.robot.robotState = null;
        break;
      case actionTypes.ROBOT_STATE_CHANGED:
        draft.robot.robotState = action.payload;
        break;
      case actionTypes.ROBOT_CONFIG_LOADED:
        draft.robot.robotConfig = action.payload;
        break;
      case actionTypes.ROBOT_JOB_UPDATED:
        draft.robot.activeJobId = action.payload;
        break;
      case actionTypes.ROBOT_BAR_SYNCED:
        draft.bar = action.payload.barEntries;
        draft.robot.unresolvedLiquids = action.payload.unresolvedLiquids;
        break;
      case actionTypes.MANUAL_INGREDIENTS_LOADED:
        draft.manualBar = action.payload;
        break;
      default:
    }
  });
