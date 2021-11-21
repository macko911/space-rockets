import React from "react";
import { Star } from "react-feather";
import { IconButton } from "@chakra-ui/core";
import { useFavouriteLaunchPad } from "../utils/favourites-context";

export default function FavouriteLaunchPadButton({ launchPadId }) {
  const { isFavourite, toggleFavouriteLaunchPad } = useFavouriteLaunchPad(launchPadId);

  function handleFavouriteClick(event) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavouriteLaunchPad();
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
