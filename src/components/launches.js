import React from "react";
import { SimpleGrid, Flex } from "@chakra-ui/core";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import FavouriteLaunches from "./favourite-launches";
import LaunchItem from "./launch-item";
import LaunchFilters from "./launch-filters";
import { useFilteredLaunches } from "../utils/launch-filters-context";

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useFilteredLaunches(PAGE_SIZE);

  return (
    <div>
      <Flex justify="space-between" align="center" mx={4}>
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
        />
        <FavouriteLaunches />
      </Flex>
      <LaunchFilters />
      <SimpleGrid m={[2, null, 6]} mt={[0, null, 0]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .map((launch) => (
              <LaunchItem launch={launch} key={launch.flight_number} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

