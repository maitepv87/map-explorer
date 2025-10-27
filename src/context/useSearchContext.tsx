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

// Create the context
const SearchContext = createContext<
  { state: SearchState; dispatch: Dispatch<SearchAction> } | undefined
>(undefined);

// Provider that wraps the app
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Hook to consume the context
export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
