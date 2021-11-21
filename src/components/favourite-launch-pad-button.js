import React from "react";
import { useFavouriteLaunchPad } from "../utils/favourites-context";
import FavouriteButton from "./favourite-button";

export default function FavouriteLaunchPadButton({ launchPadId }) {
  const { isFavourite, toggleFavouriteLaunchPad } = useFavouriteLaunchPad(launchPadId);

  return (
    <FavouriteButton
      isFavourite={isFavourite}
      onClick={toggleFavouriteLaunchPad}
    />
  );
}
