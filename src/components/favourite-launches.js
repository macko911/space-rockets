import React, { Fragment } from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import styled from "@emotion/styled";
import Error from "./error";
import LaunchItem from "./launch-item";
import { useSpaceX } from "../utils/use-space-x";
import FavouritesDrawer from "./favourites-drawer";
import { useFavouriteLaunches } from "../utils/favourites-context";

const Spacer = styled.div`
  height: 1rem;
`;

export default function FavouriteLaunches() {
  const favouriteLaunches = useFavouriteLaunches();
  return (
    <FavouritesDrawer>
      <Flex direction="column" role="list" aria-label="Favourites list">
        {favouriteLaunches.length === 0 && (
          <Text>
            No favourite launches yet.
          </Text>
        )}
        {favouriteLaunches.map((launchId) => (
          <Fragment key={launchId}>
            <FavouriteLaunchItem launchId={launchId} />
            {/* FIXME: Stack spacing prop doesn't work, upgrade Chakra UI */}
            <Spacer />
          </Fragment>
        ))}
      </Flex>
    </FavouritesDrawer>
  );
}

function FavouriteLaunchItem({ launchId }) {
  const { data: launch, error } = useSpaceX(`/launches/${launchId}`);
  return (
    <Box>
      {error && <Error />}
      {launch && <LaunchItem launch={launch} variant="favourites-list" />}
    </Box>
  );
}
