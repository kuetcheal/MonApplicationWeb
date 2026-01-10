import { createSlice } from "@reduxjs/toolkit";

// clé unique pour une vidéo (on essaye plusieurs champs possibles)
const getVideoKey = (video) =>
  video?.id ??
  video?._id ??
  video?.filePath ??
  video?.slug ??
  video?.title ??
  null;

const initialState = {
  items: [], // chaque item = { ...video, _favKey }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const video = action.payload;
      const key = getVideoKey(video);
      if (!key) return;

      const index = state.items.findIndex((v) => v._favKey === key);

      if (index >= 0) {
        // déjà en favoris → on retire
        state.items.splice(index, 1);
      } else {
        // pas encore → on ajoute
        state.items.push({ ...video, _favKey: key });
      }
    },
    // au cas où on veuille un jour réinjecter une liste complète
    setFavorites(state, action) {
      state.items = action.payload ?? [];
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;

// selector réutilisable pour savoir si UNE vidéo est en favoris
export const selectIsFavorite = (state, video) => {
  const key = getVideoKey(video);
  if (!key) return false;
  return state.favorites.items.some((v) => v._favKey === key);
};

export default favoritesSlice.reducer;
