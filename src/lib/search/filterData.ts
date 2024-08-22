export default function filterData<T extends { name: string }>(
  value: string,
  arr: T[]
): T[] {
  const regex = new RegExp(value, "i");
  const filtered: T[] = arr.filter((e) => {
    return e.name.match(regex);
  });
  return filtered;
}
