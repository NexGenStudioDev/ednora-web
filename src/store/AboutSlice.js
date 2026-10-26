import { createSlice } from '@reduxjs/toolkit';
import frontendConfig from '../config/frontend.config.js';

const defaultAboutPage = frontendConfig.aboutPage;
const defaultTeachers = frontendConfig.aboutPage.Teachers;
const defaultCourses = frontendConfig.aboutPage.Courses;

const defaultAboutPage = {
   AboutHero: {
      image:
         'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop',
      Heading: 'Nurturing Innovation, Building Careers',
      paragraph:
         'CIITM Dhanbad is committed to providing world-class technical education in computer applications, programming, and emerging digital technologies.',
   },
   History: {
      paragraph_First:
         'Established with a vision to provide top-notch computer science and IT education in Dhanbad, CIITM has grown into a benchmark of academic excellence.',
      paragraph_Second:
         'From its inception, the institute focused on bridging the divide between theoretical academics and practical industry demands.',
      paragraph_Third:
         'Over the years, hundreds of students have graduated from our portals to secure leading positions in global IT companies.',
      paragraph_Four:
         'Today, CIITM continues to expand its pedagogical prowess with cutting-edge labs, modern curriculum, and industry collaborations.',
   },
   Vision_and_Mission: {
      title: 'Our Vision & Strategic Mission',
      paragraph_First:
         'To be recognized as a premier institution in eastern India for computing sciences, software engineering, and technological entrepreneurship.',
      paragraph_Second:
         'To provide quality, affordable education that equips youth from all backgrounds with high-demand 21st-century digital skills.',
      paragraph_Third:
         'To foster an innovative learning ecosystem driven by ethical leadership, research-oriented thinking, and practical problem solving.',
      paragraph_Four:
         'To maintain active corporate relationships ensuring robust placement opportunities and real-world project exposure for all students.',
   },
   Facilities: [
      'Advanced Computer Labs',
      'High-Speed Campus Wi-Fi',
      'Digital Library',
      'Smart Classrooms',
      'Career Placement Cell',
   ],
   Description: {
      'Advanced Computer Labs':
         'Equipped with the latest hardware configurations, high-performance workstations, and licensed developer environments for hands-on programming.',
      'High-Speed Campus Wi-Fi':
         'Seamless high-bandwidth optical fiber internet connectivity across academic blocks, laboratory zones, and study lounges.',
      'Digital Library':
         'Extensive collection of books, international academic journals, e-books, and research publications accessible 24/7.',
      'Smart Classrooms':
         'Ergonomically designed lecture halls with audiovisual projectors and interactive screens for immersive pedagogy.',
      'Career Placement Cell':
         'Dedicated placement unit delivering soft skills coaching, aptitude workshops, resume building, and mock technical interviews with leading MNC recruiters.',
   },
};

const defaultTeachers = [
   {
      _id: 't-1',
      name: 'Prof. A. K. Sharma',
      role: 'Head of Department - Computer Science',
      qualification: 'M.Tech, Ph.D in Computer Applications',
      image:
         'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
   },
   {
      _id: 't-2',
      name: 'Prof. Neha Gupta',
      role: 'Senior Assistant Professor - Web Technologies',
      qualification: 'MCA, Full Stack Specialist',
      image:
         'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
   },
];

const defaultCourses = [
   {
      _id: 'c-1',
      name: 'Bachelor of Computer Applications (BCA)',
      duration: '3 Years (6 Semesters)',
      description:
         'Comprehensive degree covering Programming Languages, Web Development, Databases, Cloud & Software Engineering.',
   },
   {
      _id: 'c-2',
      name: 'Bachelor of Business Administration (BBA)',
      duration: '3 Years (6 Semesters)',
      description:
         'Foundational business and management curriculum focusing on marketing, organizational behavior, and finance.',
   },
];

let aboutSlice = createSlice({
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
