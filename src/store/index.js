import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoritesReducer from "./favoritesSlice";

const PERSIST_KEY = "aw_favorites_v1";

// lire les favoris depuis localStorage
const loadFavoritesFromStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PERSIST_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Erreur lecture favoris localStorage", e);
    return [];
  }
};

const preloadedState = {
  favorites: {
    items: loadFavoritesFromStorage(),
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});

// sauvegarde des favoris à chaque changement
store.subscribe(() => {
  try {
    const state = store.getState();
    const items = state.favorites?.items ?? [];
    if (typeof window !== "undefined") {
      window.localStorage.setItem(PERSIST_KEY, JSON.stringify(items));
    }
  } catch (e) {
    console.warn("Erreur écriture favoris localStorage", e);
  }
});

export default store;
