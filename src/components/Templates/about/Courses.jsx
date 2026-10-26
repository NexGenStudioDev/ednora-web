import React, { memo, Suspense, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { setCources } from '../../../store/AboutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import frontendConfig from '../../../config/frontend.config.js';

const CourseCard = memo(({ data }) => {
   return (
      <div className='card-1 h-full w-[25%] max-[599px]:w-full px-3 py-4 border border-gray-200 shadow-sm rounded-xl max-[1098px]:w-[40%] bg-white flex flex-col justify-between hover:shadow-md transition-shadow'>
         <div
            className='div w-full h-[32vh] rounded-xl bg-gray-100 overflow-hidden'
            style={{
               backgroundImage: `url(${data?.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
            }}
         />
         <div className='mt-3 flex-1 flex flex-col justify-between'>
            <h3 className='py-1 text-base md:text-lg font-bold text-gray-900 leading-snug'>
               {data?.courseName}
            </h3>
            {data?.description && (
               <p className='text-xs text-gray-600 line-clamp-2 mt-1 mb-2 font-[Poppins]'>
                  {data.description}
               </p>
            )}
            <div className='flex items-center justify-between pt-2 border-t border-gray-100 mt-2'>
               <p className='text-primary text-xs md:text-sm font-semibold'>
                  {data?.duration}
               </p>

               {data?._id ? (
                  <Link to={`/course/${data._id}`}>
                     <button className='text-xs font-semibold bg-gray-900 text-white py-1.5 px-3.5 rounded-lg hover:bg-primary transition-colors'>
                        View Details
                     </button>
                  </Link>
               ) : (
                  <Link to='/contact'>
                     <button className='text-xs font-semibold bg-gray-900 text-white py-1.5 px-3.5 rounded-lg hover:bg-primary transition-colors'>
                        Learn More
                     </button>
                  </Link>
               )}
            </div>
         </div>
      </div>
   );
});

const Courses = () => {
   const [Error, setError] = useState(null);
   const [courseData, setCourseData] = useState([]);
   const dispatch = useDispatch();

   const courseSlice = useSelector(state => state.about.courses);

   const defaultPrograms =
      frontendConfig.aboutPage?.academicPrograms?.programs || [];
   const heading =
      frontendConfig.aboutPage?.academicPrograms?.heading ||
      'Find a Learning Path That Fits Your Goals';
   const introduction =
      frontendConfig.aboutPage?.academicPrograms?.introduction ||
      'Whether you want to build a foundation in computing, understand business, or develop practical web development skills, explore learning pathways designed around your interests and future ambitions.';

   const fetchAllCourse = async () => {
      try {
         const res = await axios.get('/api/v1/user/findAllCourse');
         const data = res.data?.data;

         if (data && data.length > 0) {
            dispatch(setCources(data));
            setCourseData(data);
         }
         setError(null);
      } catch (error) {
         console.error(
            'Error fetching courses:',
            error.response ? error.response.data : error.message,
         );
         // Keep existing or fallback
      }
   };

   useEffect(() => {
      fetchAllCourse();
   }, []);

   useEffect(() => {
      if (courseSlice && courseSlice.length > 0) {
         setCourseData(courseSlice);
      }
   }, [courseSlice]);

   // Merge with fallback programs if backend has no courses yet
   const displayCourses =
      courseData.length > 0
         ? courseData.map(data => ({
              courseName: data?.courseName || 'Course Name',
              duration: data?.courseDuration || 'Full Time',
              imageUrl: data?.courseThumbnail || '',
              _id: data?._id || '',
              price: data?.coursePrice || '',
              description: data?.courseDescription || '',
           }))
         : defaultPrograms.map(prog => ({
              courseName: prog.title,
              duration: prog.duration,
              imageUrl: '',
              _id: '',
              price: '',
              description: prog.description,
           }));

   return (
      <Suspense fallback={<div className='p-8 text-center text-gray-500'>Loading Courses...</div>}>
         <section
            id='courses'
            className='w-full px-6 lg:px-14 py-16 flex items-center justify-between flex-col gap-4 font-[Montserrat] bg-gray-50'
         >
            <div className='text-center max-w-2xl'>
               <span className='text-xs uppercase tracking-wider text-primary font-bold'>
                  Academic Programs
               </span>
               <h2 className='text-2xl lg:text-4xl font-bold text-gray-900 mt-2 mb-3'>
                  {heading}
               </h2>
               <p className='text-gray-600 text-sm md:text-base leading-relaxed font-[Poppins]'>
                  {introduction}
               </p>
            </div>

            <div className='cards w-full flex items-stretch justify-center max-[599px]:flex-col gap-6 max-[599px]:hidden max-[1103px]:flex-wrap mt-4'>
               {displayCourses.map((data, index) => (
                  <CourseCard key={index} data={data} />
               ))}
            </div>

            <div className='w-full h-full hidden max-[599px]:block py-4'>
               <Swiper
                  spaceBetween={20}
                  centeredSlides
                  autoplay={{
                     delay: 5000,
                     disableOnInteraction: true,
                  }}
                  loop={displayCourses.length > 1}
                  modules={[Autoplay]}
                  className='mySwiper'
               >
                  {displayCourses.map((data, index) => (
                     <SwiperSlide key={index}>
                        <div className='w-full h-full flex items-center justify-center p-2'>
                           <CourseCard data={data} />
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </section>
      </Suspense>
   );
};

export default Courses;
