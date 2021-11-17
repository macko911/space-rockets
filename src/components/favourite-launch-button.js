import React from "react";
import { useFavouriteLaunch } from "../utils/favourites-context";
import FavouriteButton from "./favourite-button";

export default function FavouriteLaunchButton({ launchId }) {
  const { isFavourite, toggleFavouriteLaunch } = useFavouriteLaunch(launchId);

  return (
    <FavouriteButton
      isFavourite={isFavourite}
      onClick={toggleFavouriteLaunch}
    />
  );
}
