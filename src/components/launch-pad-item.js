import React from "react";
import { Badge, Box, Flex, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import FavouriteLaunchPadButton from "./favourite-launch-pad-button";

export default function LaunchPadItem({ launchPad }) {
  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.site_id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      display="block"
      aria-label="Launch pad item"
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launchPad.status === "active" ? (
            <Badge px="2" variant="solid" variantColor="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Retired
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launchPad.attempted_launches} attempted &bull;{" "}
            {launchPad.successful_launches} succeeded
          </Box>
        </Box>

        <Flex justify="space-between">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            aria-label="Launch pad name"
          >
            {launchPad.name}
          </Box>
          <FavouriteLaunchPadButton launchPadId={launchPad.site_id} />
        </Flex>
        <Text color="gray.500" fontSize="sm">
          {launchPad.vehicles_launched.join(", ")}
        </Text>
      </Box>
    </Box>
  );
}
