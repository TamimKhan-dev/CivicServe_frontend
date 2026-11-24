import { useEffect, useState } from "react";

export function useDebounce(searchText: string, delay: number) {
  const [debouncedSearch, setDebounchedSearch] = useState(searchText ?? "");

  useEffect(() => {
    const id = setTimeout(() => setDebounchedSearch(searchText), delay);
    return () => clearTimeout(id);
  }, [searchText, delay]);

  return debouncedSearch;
}
