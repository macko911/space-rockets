import React, { useContext, useMemo } from "react";
import { useSearchParam } from "./use-search-param";
import { useSpaceXPaginated } from "./use-space-x";

export function useLaunches(pageSize) {
  return useSpaceXPaginated(
    "/launches/past",
    {
      limit: pageSize,
      order: "desc",
      sort: "launch_date_utc",
    }
  );
}

export function useFilteredLaunches(pageSize) {
  const result = useLaunches(pageSize);
  const {
    query,
    showSuccessful,
    showFailed,
  } = useLaunchFiltersContext();

  const data = useMemo(() => (result.data ?? []).flat(), [result.data]);

  const filteredData = useMemo(
    () => data.filter((launch) => {
        if (query !== "") {
          return [
            launch.mission_name,
            launch.rocket.rocket_name,
            launch.launch_site.site_name,
          ].some((name) => (name ?? "").toLowerCase().includes(query.toLowerCase()));
        }
        return true;
      })
      .filter((launch) => {
        if (launch.launch_success) {
          return showSuccessful;
        } else {
          return showFailed;
        }
      }),
      [data, query, showFailed, showSuccessful],
  );

  return useMemo(() => ({
    ...result,
    data: filteredData,
  }), [filteredData, result]);
}

const LaunchFiltersContext = React.createContext();

export function LaunchFiltersContextProvider({ children }) {
  const [query, setQuery] = useSearchParam("query", "");
  const [showSuccessful, setShowSuccessful] = useSearchParam("showSuccessful", true);
  const [showFailed, setShowFailed] = useSearchParam("showFailed", true);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      showSuccessful: parseBooleanQueryParam(showSuccessful) ?? true,
      setShowSuccessful,
      showFailed: parseBooleanQueryParam(showFailed) ?? true,
      setShowFailed,
    }),
    [query, setQuery, setShowFailed, setShowSuccessful, showFailed, showSuccessful]
  );

  return (
    <LaunchFiltersContext.Provider value={value}>
      {children}
    </LaunchFiltersContext.Provider>
  );
}

export function useLaunchFiltersContext() {
  return useContext(LaunchFiltersContext);
}

function parseBooleanQueryParam(param) {
  try {
    return JSON.parse(param);
  } catch (error) {
    return;
  }
}
