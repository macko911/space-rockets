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
