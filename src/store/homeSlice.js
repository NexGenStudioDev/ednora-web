import { createSlice } from '@reduxjs/toolkit';
import frontendConfig from '../config/frontend.config.js';

const defaultLandingPage = frontendConfig.landingPage;
const defaultAlbums = frontendConfig.galleryPage.albums;
const defaultTestimonials = frontendConfig.testimonials;

const homeSlice = createSlice({
   name: 'home',
   initialState: {
      landingPage: defaultLandingPage,
      Testimonital: defaultTestimonials,
      Album: defaultAlbums,
   },
   reducers: {
      setLandingPage: (state, action) => {
         state.landingPage = action.payload;
      },

      setTestimonital: (state, action) => {
         state.Testimonital = action.payload;
      },

      setAlbum: (state, action) => {
         state.Album = action.payload;
      },

      Remove_One_Album: (state, action) => {
         let index = state.Album.findIndex(
            item => item._id === action.payload._id,
         );
         if (index !== -1) {
            state.Album.splice(index, 1);
         }
      },
   },
});

export const {
   setLandingPage,
   setTestimonital,
   setAlbum,
   Remove_One_Album,
} = homeSlice.actions;
export default homeSlice.reducer;
