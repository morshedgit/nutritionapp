import { useState, useEffect } from "react";

export type QueryParams = {
  [key: string]: string | string[] | undefined;
};

const useSearchParams = (props: QueryParams) => {
  const [searchParams, setSearchParams] = useState<QueryParams>(props);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    Object.entries(props).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (value !== undefined) {
        queryParams.set(key, value);
      }
    });
  }, [props]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryObject: QueryParams = {};

    for (const [key, value] of searchParams.entries()) {
      queryObject[key] = value;
    }

    setSearchParams(queryObject);
  }, []);

  const setQueryParam = (key: string, value: string | string[] | undefined) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, v));
      } else {
        searchParams.set(key, value);
      }
    } else {
      searchParams.delete(key);
    }

    setSearchParams(Object.fromEntries(searchParams.entries()));

    window.history.replaceState(
      null,
      "",
      `?${searchParams.toString()}${window.location.hash}`
    );
  };

  return { searchParams, setQueryParam };
};

export default useSearchParams;
