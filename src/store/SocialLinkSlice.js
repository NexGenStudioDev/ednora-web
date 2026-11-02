import { createSlice } from '@reduxjs/toolkit';

const defaultLinks = {
   instagram: 'https://instagram.com/eduvanta',
   facebook: 'https://facebook.com/eduvanta',
   twitter: 'https://twitter.com/eduvanta',
   youtube: 'https://youtube.com/@eduvanta',
   linkedin: 'https://linkedin.com/company/eduvanta',
   email: 'info@eduvanta.edu',
};

const socialLinkSlice = createSlice({
   name: 'socialLink',
   initialState: {
      links: defaultLinks,
   },
   reducers: {
      setSocialLinks: (state, action) => {
         state.links = action.payload;
      },
   },
});

export const { setSocialLinks } = socialLinkSlice.actions;
export default socialLinkSlice.reducer;
