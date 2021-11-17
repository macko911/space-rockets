import React, { useContext, useEffect, useMemo, useReducer } from "react";

const INITIAL_STATE = {
  launches: [],
  launchPads: [],
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
    case "addFavouriteLaunchPad":
      return {
        ...state,
        launchPads: [...state.launchPads, action.launchPadId],
      };
    case "removeFavouriteLaunchPad":
      return {
        ...state,
        launchPads: state.launchPads.filter((launch) => launch !== action.launchPadId),
      };
    default:
      return state;
  }
}

const initialState = loadFavouritesFromLocalStorage();

export function FavouritesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveFavouritesToLocalStorage(state);
  }, [state]);

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
      addFavouriteLaunchPad: function(launchPadId) {
        dispatch({
          type: "addFavouriteLaunchPad",
          launchPadId,
        });
      },
      removeFavouriteLaunchPad: function(launchPadId) {
        dispatch({
          type: "removeFavouriteLaunchPad",
          launchPadId,
        });
      }
    }),
    [state],
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

function saveFavouritesToLocalStorage(state) {
  localStorage.setItem("favourites", JSON.stringify(state));
}

function loadFavouritesFromLocalStorage() {
  const savedState = localStorage.getItem("favourites");
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.error(new Error(`Failed to load favourites from local storage: ${error.message}`));
    }
  }
  return INITIAL_STATE;
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

export function useFavouriteLaunchPads() {
  return useFavouritesContext().state.launchPads;
}

export function useFavouriteLaunchPad(launchPadId) {
  const { state, addFavouriteLaunchPad, removeFavouriteLaunchPad } = useFavouritesContext();

  const isFavourite = state.launchPads.includes(launchPadId);

  function toggleFavouriteLaunchPad() {
    if (isFavourite) {
      removeFavouriteLaunchPad(launchPadId);
    } else {
      addFavouriteLaunchPad(launchPadId);
    }
  }

  return {
    isFavourite,
    toggleFavouriteLaunchPad,
  };
}
