"use client";
import { SyntheticEvent, useContext } from "react";
import { SearchContext } from "@/context/portfolio/SearchContext";

export default function Search() {
  const ctx = useContext(SearchContext);

  function submitHandler(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function changeHandler(event: SyntheticEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    ctx.setValue(value);
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        className={
          "w-full px-5 py-2 border-2 rounded-2xl border-slate-100 focus:bg-neutral-200 focus-visible:outline-neutral-300 placeholder:text-neutral-500 text-neutral-600 font-medium my-5"
        }
        placeholder="Search..."
        onChange={changeHandler}
      />
    </form>
  );
}
