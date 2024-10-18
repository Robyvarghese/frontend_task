export default function productFilter<T>(
  object: T,
  properties: Array<keyof T>,
  query: string
): boolean {
  if (query === "") {
    return true;
  }

  return properties.some((property) => {
    const value = object[property];

    if (typeof value === "string" || typeof value === "number") {
      return value.toString() === query;
    }

    return false;
  });
}
