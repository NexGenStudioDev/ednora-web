import { createSlice } from '@reduxjs/toolkit';

const defaultLandingPage = {
   HeroSection: {
      homeBackgroundImage:
         'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop',
      homeTitle: 'Top BCA Colleges In Dhanbad | CIITM',
      homeParagraph:
         'Empowering students with industry-ready IT curriculum, modern computing infrastructure, and comprehensive placement assistance.',
   },
   AboutSection: {
      image_First:
         'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop',
      image_Second:
         'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      image_Third:
         'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
      Heading_First: 'Empower Your Career With Quality IT Education',
      Heading_Second: 'Pioneering Excellence in BCA, IT & Software Applications',
      paragraph_First:
         'CIITM stands as a premier institute in Dhanbad dedicated to imparting cutting-edge technical education, software development skills, and ethical professionalism.',
      paragraph_Second:
         'Our hands-on laboratory sessions, live capstone projects, and industry internships prepare students to excel in top global technology enterprises.',
   },
   Mission_and_Goals: [
      {
         _id: 'goal-1',
         title: 'Excellence in IT',
         content:
            'Modern curriculum covering Full Stack Development, Cloud Computing, and AI.',
         image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=200&auto=format&fit=crop',
      },
      {
         _id: 'goal-2',
         title: 'Placement Support',
         content:
            'Dedicated placement cell partnering with top tech firms for campus recruitment.',
         image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=200&auto=format&fit=crop',
      },
      {
         _id: 'goal-3',
         title: 'Modern Infrastructure',
         content:
            'High-speed Wi-Fi, modern PC workstations, digital library, and smart classrooms.',
         image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=200&auto=format&fit=crop',
      },
      {
         _id: 'goal-4',
         title: 'Expert Mentorship',
         content:
            'Experienced faculty and industry leaders offering personalized career guidance.',
         image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=200&auto=format&fit=crop',
      },
   ],
};

const defaultAlbums = [
   {
      _id: 'album-1',
      aName: 'Annual Tech Fest & Hackathon',
      aImage_url:
         'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
      createdAt: '2026-03-15',
   },
   {
      _id: 'album-2',
      aName: 'Campus Life & Laboratories',
      aImage_url:
         'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop',
      createdAt: '2026-02-20',
   },
   {
      _id: 'album-3',
      aName: 'Graduation Day Ceremony',
      aImage_url:
         'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
      createdAt: '2026-01-10',
   },
];

const defaultTestimonials = [
   {
      id: 'test-1',
      name: 'Rahul Sharma',
      role: 'BCA Alumni (Software Engineer at TCS)',
      avatar:
         'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      message:
         'CIITM provided the perfect launchpad for my tech career. The faculty guidance and hands-on lab projects helped me land my dream software developer job.',
   },
   {
      id: 'test-2',
      name: 'Priya Kumari',
      role: 'BCA Final Year Student',
      avatar:
         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      message:
         'The learning environment here is exceptional. Teachers are always supportive, and the curriculum is constantly updated with real-world technologies.',
   },
];

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
            // Splice is used to remove the item from the Original Array it also returns the removed item
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
