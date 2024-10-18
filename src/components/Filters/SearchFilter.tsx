import * as React from "react";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

export interface ISearchFilterProps {
  setSearchQuery: (searchQuery: string) => void;
}

export function SearchFilter(props: ISearchFilterProps) {
  const { setSearchQuery } = props;
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  return (
    <>
      <input
        id="search"
        type="search"
        placeholder="Search for cars..."
        aria-label="Search"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
    </>
  );
}
