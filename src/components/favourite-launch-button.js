import React from "react";
import { Star } from "react-feather";
import { IconButton } from "@chakra-ui/core";
import { useFavouriteLaunch } from "../utils/favourites-context";

export default function FavouriteLaunchButton({ launchId }) {
  const { isFavourite, toggleFavouriteLaunch } = useFavouriteLaunch(launchId);

  function handleFavouriteClick(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavouriteLaunch();
  }

  return (
    <IconButton
      aria-label="Favourite button"
      variantColor={isFavourite ? "teal" : undefined}
      icon={Star}
      onClick={handleFavouriteClick}
    />
  );
}
