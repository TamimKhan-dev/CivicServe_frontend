import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useUrlFilters<T extends Record<string, string>>(
  defaults: T,
  searchKey?: keyof T & string,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const values = {} as T;
  for (const key of Object.keys(defaults)) {
    values[key as keyof T] = (searchParams.get(key) ??
      defaults[key]) as T[keyof T];
  }

  const setParams = (patch: Partial<T>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined || value === "" || value === defaults[key]) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    }

    if (!("page" in patch)) params.delete("page");

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const urlSearch = searchKey ? values[searchKey] : "";
  const [searchText, setSearchText] = useState<string>(urlSearch);
  const debouncedSearch = useDebounce(searchText, 400).trim();

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only when the debounce text changes
  useEffect(() => {
    if (searchKey && debouncedSearch !== urlSearch) {
      setParams({ [searchKey]: debouncedSearch } as Partial<T>);
    }
  }, [debouncedSearch]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only when the URL text changes
  useEffect(() => {
    if (urlSearch !== debouncedSearch) setSearchText(urlSearch);
  }, [urlSearch]);

  return { values, setParams, searchText, setSearchText };
}
