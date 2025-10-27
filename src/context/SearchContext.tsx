import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useReducer,
} from "react";
import {
  searchReducer,
  initialState,
  type SearchState,
  type SearchAction,
} from "./useSearchReducer";

// Create a context to share search state and dispatch across components
const SearchContext = createContext<
  { state: SearchState; dispatch: Dispatch<SearchAction> } | undefined
>(undefined);

// Provider component that wraps the app and supplies search state via context
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to access the search context safely
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
