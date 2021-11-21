import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import {
  FavouritesContextProvider,
  useFavouriteLaunch,
  useFavouriteLaunches,
  useFavouriteLaunchPad,
  useFavouriteLaunchPads,
  useFavouritesContext,
} from "./favourites-context";

const wrapper = ({ children }) => (
  <FavouritesContextProvider>
    {children}
  </FavouritesContextProvider>
);

describe("Favourites context", () => {
  describe("useFavouriteLaunch", () => {
    it("adds/removes launch item", () => {
      const { result } = renderHook(() => useFavouriteLaunch(1), { wrapper });

      expect(result.current.isFavourite).toBe(false);

      act(() => {
        result.current.toggleFavouriteLaunch(1);
      });

      expect(result.current.isFavourite).toBe(true);

      act(() => {
        result.current.toggleFavouriteLaunch(1);
      });

      expect(result.current.isFavourite).toBe(false);
    });
  });

  describe("useFavouriteLaunches", () => {
    it("returns list of launches", () => {
      const { result } = renderHook(() => ({
        context: useFavouritesContext(),
        launches: useFavouriteLaunches(),
      }), { wrapper });

      act(() => {
        result.current.context.addFavouriteLaunch(1);
        result.current.context.addFavouriteLaunch(2);
        result.current.context.addFavouriteLaunch(3);
      });

      expect(result.current.launches).toStrictEqual([1, 2, 3]);
    });
  });

  describe("useFavouriteLaunchPad", () => {
    it("adds/removes launch pad item", () => {
      const { result } = renderHook(() => useFavouriteLaunchPad(1), { wrapper });

      expect(result.current.isFavourite).toBe(false);

      act(() => {
        result.current.toggleFavouriteLaunchPad(1);
      });

      expect(result.current.isFavourite).toBe(true);

      act(() => {
        result.current.toggleFavouriteLaunchPad(1);
      });

      expect(result.current.isFavourite).toBe(false);
    });
  });

  describe("useFavouriteLaunchPads", () => {
    it("returns list of launch pads", () => {
      const { result } = renderHook(() => ({
        context: useFavouritesContext(),
        launchPads: useFavouriteLaunchPads(),
      }), { wrapper });

      act(() => {
        result.current.context.addFavouriteLaunchPad(1);
        result.current.context.addFavouriteLaunchPad(2);
        result.current.context.addFavouriteLaunchPad(3);
      });

      expect(result.current.launchPads).toStrictEqual([1, 2, 3]);
    });
  });
});
