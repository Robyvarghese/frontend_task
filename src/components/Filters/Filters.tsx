import * as React from "react";
import { useEffect, useState } from "react";
import { SelectInput } from "vcc-ui";
import { CarObject } from "../../../types/car";
import useMediaQuery from "../../hooks/useMediaQuery";

export interface IFiltersProps {
  setFilterQuery: (searchQuery: string) => void;
  data: CarObject[];
}

export const Filters = (props: IFiltersProps) => {
  const { setFilterQuery } = props;
  const [query, setQuery] = useState<string>("");
  const isMobile = useMediaQuery("(max-width:768px)");

  useEffect(() => {
    setFilterQuery(query);
  }, [query, setFilterQuery]);

  return (
    <>
      {!isMobile && (<label htmlFor="filter" style={{ marginTop: "10px", paddingLeft: "16px" }}>
        Filter &emsp;
      </label>)}
      <select
        name="filter"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="filter"
      >
        <option value="">Select All</option>
        {props.data.map((item) => (
          <option key={item.modelName + item.id} value={item.id}>
            {item.modelName}
          </option>
        ))}
      </select>
    </>
  );
};
