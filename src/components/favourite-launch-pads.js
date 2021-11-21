import React, { Fragment } from "react";
import { Box, Flex, Text } from "@chakra-ui/core";
import styled from "@emotion/styled";
import Error from "./error";
import { useSpaceX } from "../utils/use-space-x";
import FavouritesDrawer from "./favourites-drawer";
import { useFavouriteLaunchPads } from "../utils/favourites-context";
import LaunchPadItem from "./launch-pad-item";

const Spacer = styled.div`
  height: 1rem;
`;

export default function FavouriteLaunchPads() {
  const favouriteLaunchPads = useFavouriteLaunchPads();
  return (
    <FavouritesDrawer>
      <Flex direction="column" role="list" aria-label="Favourites list">
        {favouriteLaunchPads.length === 0 && (
          <Text>
            No favourite launch pads yet.
          </Text>
        )}
        {favouriteLaunchPads.map((launchPadId) => (
          <Fragment key={launchPadId}>
            <FavouriteLaunchPadItem launchPadId={launchPadId} />
            {/* FIXME: Stack spacing prop doesn't work, upgrade Chakra UI */}
            <Spacer />
          </Fragment>
        ))}
      </Flex>
    </FavouritesDrawer>
  );
}

function FavouriteLaunchPadItem({ launchPadId }) {
  const { data: launchPad, error } = useSpaceX(`/launchpads/${launchPadId}`);
  return (
    <Box>
      {error && <Error />}
      {launchPad && <LaunchPadItem launchPad={launchPad} variant="favourites-list" />}
    </Box>
  );
}
