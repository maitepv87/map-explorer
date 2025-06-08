import { createContext, useReducer, useContext } from "react";
import type { Place } from "../api/Place";

interface SearchState {
  searchTerm: string;
  places: Place[];
  isLoading: boolean;
  hasSearched: boolean;
  errorMessage: string | null;
}

const initialState: SearchState = {
  searchTerm: "",
  places: [],
  isLoading: false,
  hasSearched: false,
  errorMessage: null,
};

export type SearchAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_PLACES"; payload: Place[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_HAS_SEARCHED"; payload: boolean };

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_PLACES":
      return { ...state, places: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "SET_HAS_SEARCHED":
      return { ...state, hasSearched: action.payload };
    default:
      return state;
  }
}

const SearchContext = createContext<
  { state: SearchState; dispatch: React.Dispatch<SearchAction> } | undefined
>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
