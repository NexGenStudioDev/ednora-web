import { createSlice } from '@reduxjs/toolkit';

const defaultLinks = {
   instagram: 'https://instagram.com/ciitmdhanbad',
   facebook: 'https://facebook.com/ciitmdhanbad',
   twitter: 'https://twitter.com/ciitmdhanbad',
   youtube: 'https://youtube.com',
   linkedin: 'https://linkedin.com',
   email: 'info@ciitm.ac.in',
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
