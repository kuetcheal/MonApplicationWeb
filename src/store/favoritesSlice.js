import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // tableau de vidéos mises en favoris
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const video = action.payload;
      if (!video || !video.id) return; // assure-toi que chaque vidéo a un id

      const index = state.items.findIndex((v) => v.id === video.id);

      if (index >= 0) {
        // déjà en favoris → on retire
        state.items.splice(index, 1);
      } else {
        // pas encore → on ajoute
        state.items.push(video);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
