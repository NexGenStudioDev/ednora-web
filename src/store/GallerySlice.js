import { createSlice } from '@reduxjs/toolkit';

let GallerySlice = createSlice({
   name: 'gallery',
   initialState: [],
   reducers: {
      set_Gallery: (state, action) => {
         return action.payload; // Directly return the new state
      },
   },
});

export const { set_Gallery } = GallerySlice.actions;
export default GallerySlice.reducer;
