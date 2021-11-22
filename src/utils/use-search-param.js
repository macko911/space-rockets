import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * @returns Similar to useState hook, it returns a current value for given
 * query parameter and a Setter method that updates parameter in URL
 */
export function useSearchParam (key, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams();

  return useMemo(() => {
    const value = searchParams.get(key) ?? defaultValue;
    function setSearchParam(value) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        [key]: value,
      }, { replace: true });
    }
    return [value, setSearchParam];
  }, [defaultValue, key, searchParams, setSearchParams]);
}
