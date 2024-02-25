export default function Search() {
  return (
    <input
      className={
        "w-full px-5 py-2 border-2 rounded-2xl border-slate-100 focus:bg-neutral-200 focus-visible:outline-neutral-300 placeholder:text-neutral-500 text-neutral-600 font-medium my-5"
      }
      placeholder="Search..."
    />
  );
}
