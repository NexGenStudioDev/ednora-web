import { createSlice } from '@reduxjs/toolkit';
import frontendConfig from '../config/frontend.config.js';

const defaultAboutPage = frontendConfig.aboutPage;
const defaultTeachers = frontendConfig.aboutPage.Teachers;
const defaultCourses = frontendConfig.aboutPage.Courses;

const aboutSlice = createSlice({
   name: 'about',
   initialState: {
      aboutPage: defaultAboutPage,
      teacher: defaultTeachers,
      courses: defaultCourses,
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
