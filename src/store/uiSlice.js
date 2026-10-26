import { createSlice } from '@reduxjs/toolkit';
import frontendConfig from '../config/frontend.config.js';

const uiSlice = createSlice({
   name: 'ui',
   initialState: {
      landingPage: frontendConfig.landingPage,
      aboutPage: frontendConfig.aboutPage,
      testimonials: frontendConfig.testimonials,
   },
   reducers: {
      setLandingPage: (state, action) => {
         state.landingPage = action.payload;
      },
      setAboutPage: (state, action) => {
         state.aboutPage = action.payload;
      },
   },
   setTestimonials: (state, action) => {
      state.testimonials = action.payload;
   },
});

export const { setLandingPage, setAboutPage, setTestimonials } =
   uiSlice.actions;
export default uiSlice.reducer;
