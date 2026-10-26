import { createSlice } from '@reduxjs/toolkit';
import frontendConfig from '../config/frontend.config.js';

const defaultAboutPage = frontendConfig.aboutPage;

const aboutSlice = createSlice({
   name: 'about',
   initialState: {
      aboutPage: defaultAboutPage,
      teacher: [],
      courses: [],
   },
   reducers: {
      setAboutPage: (state, action) => {
         state.aboutPage = action.payload;
      },

      setTeacher: (state, action) => {
         state.teacher = action.payload;
      },

      setCources: (state, action) => {
         state.courses = action.payload;
      },
   },
});

export const { setAboutPage, setTeacher, setCources } =
   aboutSlice.actions;
export default aboutSlice.reducer;
