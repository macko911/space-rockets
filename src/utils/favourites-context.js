import React, { useContext, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  launches: [],
};

const FavouritesContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "addFavouriteLaunch":
      return {
        ...state,
        launches: [...state.launches, action.launchId],
      };
    case "removeFavouriteLaunch":
      return {
        ...state,
        launches: state.launches.filter((launch) => launch !== action.launchId),
      };
    default:
      return state;
  }
}

export function FavouritesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const value = useMemo(
    () => ({
      state,
      addFavouriteLaunch: function (launchId) {
        dispatch({
          type: "addFavouriteLaunch",
          launchId,
        });
      },
      removeFavouriteLaunch: function (launchId) {
        dispatch({
          type: "removeFavouriteLaunch",
          launchId,
        });
      },
    }),
    [state],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

function useFavouritesContext() {
  return useContext(FavouritesContext);
}

export function useFavouriteLaunches() {
  return useFavouritesContext().state.launches;
}

export function useFavouriteLaunch(launchId) {
  const { state, addFavouriteLaunch, removeFavouriteLaunch } = useFavouritesContext();

  const isFavourite = state.launches.includes(launchId);

  function toggleFavouriteLaunch() {
    if (isFavourite) {
      removeFavouriteLaunch(launchId);
    } else {
      addFavouriteLaunch(launchId);
    }
  }

  return {
    isFavourite,
    toggleFavouriteLaunch,
  };
}
