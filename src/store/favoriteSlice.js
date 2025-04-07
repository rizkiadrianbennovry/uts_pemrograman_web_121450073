import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload.id);
      if (index >= 0) {
        state.splice(index, 1); // remove
      } else {
        state.push(action.payload); // add
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
