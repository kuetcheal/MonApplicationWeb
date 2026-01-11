import { createSlice } from "@reduxjs/toolkit";

const getVideoKey = (videoOrId) => {
  if (!videoOrId) return null;
  if (typeof videoOrId === "number") return String(videoOrId);
  return (
    videoOrId.id ??
    videoOrId._id ??
    videoOrId.filePath ??
    videoOrId.slug ??
    videoOrId.title ??
    null
  );
};

const initialState = {
  byId: {}, // [key]: { liked: boolean, disliked: boolean }
};

const videoReactionsSlice = createSlice({
  name: "videoReactions",
  initialState,
  reducers: {
    setReactionsForVideo(state, action) {
      const { video, liked, disliked } = action.payload;
      const key = getVideoKey(video);
      if (!key) return;
      state.byId[key] = { liked: !!liked, disliked: !!disliked };
    },
    toggleLikeLocal(state, action) {
      const video = action.payload;
      const key = getVideoKey(video);
      if (!key) return;
      const prev = state.byId[key] || { liked: false, disliked: false };
      const newLiked = !prev.liked;
      state.byId[key] = {
        liked: newLiked,
        disliked: newLiked ? false : prev.disliked,
      };
    },
    toggleDislikeLocal(state, action) {
      const video = action.payload;
      const key = getVideoKey(video);
      if (!key) return;
      const prev = state.byId[key] || { liked: false, disliked: false };
      const newDisliked = !prev.disliked;
      state.byId[key] = {
        disliked: newDisliked,
        liked: newDisliked ? false : prev.liked,
      };
    },
  },
});

export const {
  setReactionsForVideo,
  toggleLikeLocal,
  toggleDislikeLocal,
} = videoReactionsSlice.actions;

export const selectReactionsForVideo = (state, videoOrId) => {
  const key = getVideoKey(videoOrId);
  if (!key) return { liked: false, disliked: false };
  return state.videoReactions.byId[key] || { liked: false, disliked: false };
};

export default videoReactionsSlice.reducer;
