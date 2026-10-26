import { createSlice } from '@reduxjs/toolkit';
import frontendConfig from '../config/frontend.config.js';

let GallerySlice = createSlice({
   name: 'gallery',
   initialState: frontendConfig.galleryPage.images || [],
   reducers: {
      set_Gallery: (state, action) => {
         return action.payload; // Directly return the new state
      },
   },
});

export const { set_Gallery } = GallerySlice.actions;
export default GallerySlice.reducer;
