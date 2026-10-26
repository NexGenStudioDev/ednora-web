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

const CourseCard = memo(({ data }) => {
   return (
      <div className='card-1 h-full w-[25%] max-[599px]:w-full px-2 py-3 border-[1px] border-black rounded-xl max-[1098px]:w-[40%]'>
         <div
            className='div w-full h-[35vh] rounded-xl bg-[#d9d9d9]'
            style={{
               backgroundImage: `url(${data?.imageUrl || 'https://courses.msqfon.com/wp-content/uploads/2021/03/program-bachelor-of-science-in-computer-science-1920x1080-1.jpg'})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
            }}
         ></div>
         <h1 className='py-2 text-[1.25vw] max-[599px]:text-[4.8vw] font-bold'>
            {data?.courseName}
         </h1>
         <div className='flex items-center justify-between'>
            <p className='text-[#FF0000] underline text-[1vw] max-[599px]:text-[3.5vw] font-semibold'>
               {data?.duration}
            </p>

            <Link to={`/course/${data?._id}`}>
               <button className='border-[1px] text-[1vw] max-[599px]:text-[3.5vw] border-[#d7d7d7] bg-[#F9F9F9] text-[#333] py-[7px] px-[27px] rounded-lg hover:bg-[#333] hover:text-white'>
                  View Details
               </button>
            </Link>
         </div>
      </div>
   );
});

const Courses = () => {
   let [Error, setError] = useState(null);
   let [courseData, setCourseData] = useState([]);
   let dispatch = useDispatch();

   let courseSlice = useSelector(state => state.about.courses);

   let fetchAllCourse = async () => {
      try {
         let res = await axios.get('/api/v1/user/findAllCourse');
         let data = res.data?.data;

         dispatch(setCources(data || []));

         setCourseData(data || []);
         setError(null);
      } catch (error) {
         console.error(
            'Error fetching courses:',
            error.response ? error.response.data : error.message,
         );
         setError(
            error.response
               ? error.response.data
               : 'An unexpected error occurred',
         );
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

   return (
      <Suspense
         fallback={
            <div className='text-green-700'>
               Fetching Course From Data Base
            </div>
         }
      >
         <section className='w-full px-10 py-20 max-[599px]:py-10 flex items-center justify-between flex-col gap-4'>
            <div className='title text-[#333] text-[3.5vw] max-[599px]:text-[10vw] font-bold font-[Montserrat]'>
               Our Courses
            </div>

            <p className='text text-[1vw] max-[599px]:text-[3vw] font-[Poppins] w-[40%] max-[599px]:w-[90%] text-center pb-8'>
               We have a group of eminent Faculty members with great
               personality and excellence in their specific domains.
            </p>

            <div className='cards w-full flex items-center justify-center max-[599px]:flex-col gap-4 max-[599px]:hidden max-[1103px]:flex-wrap'>
               {Error ? (
                  <p className='text-red-500'>{Error}</p>
               ) : (
                  courseData.map((data, index) => (
                     <CourseCard
                        key={index}
                        data={{
                           courseName:
                              data?.courseName || 'Course Name',
                           duration:
                              data?.courseDuration ||
                              'Course Duration',
                           imageUrl: data?.courseThumbnail || '',
                           _id: data?._id || '',
                           price: data?.coursePrice || 'Course Price',
                        }}
                     />
                  ))
               )}
            </div>

            <div className='w-full h-full hidden max-[599px]:block py-5'>
               <Swiper
                  spaceBetween={30}
                  centeredSlides
                  autoplay={{
                     delay: 5000,
                     disableOnInteraction: true,
                  }}
                  loop
                  modules={[Autoplay]}
                  className='mySwiper'
               >
                  {Error ? (
                     <p className='text-red-500'>{Error}</p>
                  ) : (
                     courseData.map((data, index) => (
                        <SwiperSlide key={index}>
                           <div className='w-full h-full flex items-center justify-center'>
                              <CourseCard
                                 key={index}
                                 data={{
                                    courseName:
                                       data?.courseName ||
                                       'Course Name',
                                    duration:
                                       data?.courseDuration ||
                                       'Course Duration',
                                    imageUrl:
                                       data?.courseThumbnail || '',
                                    _id: data?._id || '',
                                    price:
                                       data?.coursePrice ||
                                       'Course Price',
                                 }}
                              />
                           </div>
                        </SwiperSlide>
                     ))
                  )}
               </Swiper>
            </div>
         </section>
      </Suspense>
   );
};

export default Courses;
