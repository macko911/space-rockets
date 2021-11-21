import React from "react";
import { Star } from "react-feather";
import { IconButton } from "@chakra-ui/core";

export default function FavouriteButton({ onClick, isFavourite }) {
  function handleFavouriteClick(event) {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  }

  return (
    <IconButton
      aria-label="Favourite button"
      variantColor={isFavourite ? "teal" : undefined}
      aria-pressed={isFavourite}
      icon={Star}
      onClick={handleFavouriteClick}
    />
  );
}
