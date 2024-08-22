"use client";
import {
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";

export interface ISearchContext {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

interface props {
  children: ReactNode;
}

export const SearchContext = createContext<ISearchContext>({
  value: "",
  setValue: () => {},
});
export default function SearchContextProvider({ children }: props) {
  const [value, setValue] = useState<string>("");
  return (
    <SearchContext.Provider value={{ value, setValue }}>
      {children}
    </SearchContext.Provider>
  );
}
