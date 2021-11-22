import { Checkbox, Input, Stack } from "@chakra-ui/core";
import React from "react";
import { useLaunchFiltersContext } from "../utils/launch-filters-context";

export default function LaunchFilters() {
  const {
    query,
    setQuery,
    showSuccessful,
    setShowSuccessful,
    showFailed,
    setShowFailed,
  } = useLaunchFiltersContext();

  return (
    <Stack spacing={10} m={6} mt={0} maxWidth="600px" direction="row">
      <Input
        placeholder="Filter missions, rockets, sites..."
        onChange={(event) => setQuery(event.currentTarget.value)}
        value={query}
      />
        <Checkbox
          isChecked={showSuccessful}
          onChange={(event) => setShowSuccessful(event.target.checked)}
        >
          Successful
        </Checkbox>
        <Checkbox
          isChecked={showFailed}
          onChange={(event) => setShowFailed(event.target.checked)}
        >
          Failed
        </Checkbox>
    </Stack>
  );
}
