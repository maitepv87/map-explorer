import { ACTION_TYPES } from "./actionTypes";
import type { Place } from "../api/Place";

// Defines the shape of our search state
export interface SearchState {
  searchTerm: string;
  places: Place[];
  isLoading: boolean;
  hasSearched: boolean;
  errorMessage: string | null;
}

// Initial state for the search reducer
export const initialState: SearchState = {
  searchTerm: "",
  places: [],
  isLoading: false,
  hasSearched: false,
  errorMessage: null,
};

// All possible actions the reducer can handle
export type SearchAction =
  | { type: typeof ACTION_TYPES.SET_SEARCH_TERM; payload: string }
  | { type: typeof ACTION_TYPES.SET_PLACES; payload: Place[] }
  | { type: typeof ACTION_TYPES.SET_LOADING; payload: boolean }
  | { type: typeof ACTION_TYPES.SET_ERROR; payload: string | null }
  | { type: typeof ACTION_TYPES.SET_HAS_SEARCHED; payload: boolean };

// Reducer function to update search state based on dispatched actions
export const searchReducer = (
  state: SearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case ACTION_TYPES.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case ACTION_TYPES.SET_PLACES:
      return { ...state, places: action.payload };
    case ACTION_TYPES.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTION_TYPES.SET_ERROR:
      return { ...state, errorMessage: action.payload };
    case ACTION_TYPES.SET_HAS_SEARCHED:
      return { ...state, hasSearched: action.payload };
    default:
      return state;
  }
};
