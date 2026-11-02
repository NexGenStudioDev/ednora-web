import React, { memo, Suspense, useState, useEffect, useMemo } from 'react';
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
import {
   MdAccessTime,
   MdCurrencyRupee,
   MdArrowForward,
   MdChevronLeft,
   MdChevronRight,
   MdSearch,
   MdSchool,
} from 'react-icons/md';

const CourseCard = memo(({ data }) => {
   const courseId = data?._id || data?.slug || encodeURIComponent(data?.courseName || '');
   const hasValidLink = Boolean(courseId);

   return (
      <div className='card-1 group h-full w-full max-w-[370px] bg-white border border-gray-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-xl rounded-2xl flex flex-col justify-between overflow-hidden transition-all duration-300 transform hover:-translate-y-1'>
         {/* Course Banner Image */}
         <div className='relative w-full h-48 bg-gradient-to-tr from-slate-800 to-slate-900 overflow-hidden'>
            <div
               className='w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
               style={{
                  backgroundImage: `url(${data?.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'})`,
               }}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-black/20' />

            {/* Department / Category Pill */}
            {data?.department && (
               <div className='absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-gray-800 backdrop-blur-md shadow-sm border border-gray-100'>
                  {data.department}
               </div>
            )}

            {/* Code Badge */}
            {data?.courseCode && (
               <div className='absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-600/90 text-white backdrop-blur-md shadow-sm'>
                  {data.courseCode}
               </div>
            )}

            {/* Price Badge in Image Bottom */}
            {data?.price !== undefined && data?.price !== '' && (
               <div className='absolute bottom-3 right-3 flex items-center gap-0.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-gray-900 shadow-md'>
                  <MdCurrencyRupee size={14} className='text-emerald-600' />
                  <span>{Number(data.price).toLocaleString('en-IN')}</span>
               </div>
            )}
         </div>

         {/* Content Area */}
         <div className='p-5 flex-1 flex flex-col justify-between'>
            <div>
               <div className='flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1.5'>
                  <MdAccessTime size={15} />
                  <span>{data?.duration || 'Full Time'}</span>
               </div>

               <h3 className='text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2'>
                  {data?.courseName}
               </h3>

               {data?.description && (
                  <p className='text-xs text-gray-600 line-clamp-3 mt-2 font-[Poppins] leading-relaxed'>
                     {data.description}
                  </p>
               )}
            </div>

            {/* Actions Footer */}
            <div className='flex items-center gap-2 pt-4 border-t border-gray-100 mt-4'>
               {hasValidLink ? (
                  <Link
                     to={`/course/${courseId}`}
                     className='flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-gray-900 text-white py-2.5 px-3 rounded-xl hover:bg-blue-600 transition-colors'
                  >
                     <span>View Details</span>
                     <MdArrowForward size={14} />
                  </Link>
               ) : (
                  <Link
                     to='/contact'
                     className='flex-1 inline-flex items-center justify-center text-xs font-semibold bg-gray-900 text-white py-2.5 px-3 rounded-xl hover:bg-blue-600 transition-colors'
                  >
                     Learn More
                  </Link>
               )}

               <Link
                  to={`/admission${data?.courseName ? `?course=${encodeURIComponent(data.courseName)}` : ''}`}
                  className='inline-flex items-center justify-center text-xs font-semibold border border-blue-200 text-blue-700 bg-blue-50/70 hover:bg-blue-100 py-2.5 px-3 rounded-xl transition-colors'
                  title='Apply Online'
               >
                  Apply
               </Link>
            </div>
         </div>
      </div>
   );
});

const Courses = () => {
   const [courseData, setCourseData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedDept, setSelectedDept] = useState('All');
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 6;

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
      setIsLoading(true);
      try {
         const res = await axios.get('/api/v1/user/findAllCourse');
         const data = res.data?.data;

         if (Array.isArray(data) && data.length > 0) {
            dispatch(setCources(data));
            setCourseData(data);
         }
      } catch (error) {
         console.warn(
            'Notice: Error fetching courses from backend, using fallback data:',
            error.response?.data?.message || error.message,
         );
      } finally {
         setIsLoading(false);
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

   // Normalize courses for display (incorporates fallback if DB is cold)
   const allDisplayCourses = useMemo(() => {
      if (courseData.length > 0) {
         return courseData.map(data => ({
            courseName: data?.courseName || 'Course Name',
            courseCode: data?.courseCode || '',
            duration: data?.courseDuration || 'Full Time',
            imageUrl: data?.courseThumbnail || '',
            _id: data?._id || '',
            slug: data?.courseCode || data?._id || '',
            price: data?.coursePrice || '',
            department: data?.Department || '',
            description: data?.courseDescription || '',
         }));
      }

      return defaultPrograms.map(prog => {
         const progName = prog.name || prog.title || 'Academic Program';
         const slug = progName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
         return {
            courseName: progName,
            courseCode: prog.code || '',
            duration: prog.duration || 'Full Time',
            imageUrl: prog.image || '',
            _id: slug,
            slug,
            price: prog.fee || '',
            department: prog.department || 'Academics',
            description: prog.description || '',
         };
      });
   }, [courseData, defaultPrograms]);

   // Unique departments for filter pills
   const departments = useMemo(() => {
      const depts = new Set(['All']);
      allDisplayCourses.forEach(c => {
         if (c.department) depts.add(c.department);
      });
      return Array.from(depts);
   }, [allDisplayCourses]);

   // Filtered courses based on search & department
   const filteredCourses = useMemo(() => {
      return allDisplayCourses.filter(c => {
         const matchesDept =
            selectedDept === 'All' ||
            c.department?.toLowerCase() === selectedDept.toLowerCase();

         const search = searchQuery.toLowerCase().trim();
         const matchesSearch =
            !search ||
            c.courseName.toLowerCase().includes(search) ||
            c.description?.toLowerCase().includes(search) ||
            c.courseCode?.toLowerCase().includes(search);

         return matchesDept && matchesSearch;
      });
   }, [allDisplayCourses, selectedDept, searchQuery]);

   // Reset to page 1 whenever filters change
   useEffect(() => {
      setCurrentPage(1);
   }, [searchQuery, selectedDept]);

   // Pagination calculations
   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
   const startIndex = (currentPage - 1) * itemsPerPage;
   const paginatedCourses = filteredCourses.slice(
      startIndex,
      startIndex + itemsPerPage,
   );

   return (
      <Suspense fallback={<div className='p-8 text-center text-gray-500'>Loading Courses...</div>}>
         <section
            id='courses'
            className='w-full px-4 sm:px-6 lg:px-14 py-16 flex flex-col items-center gap-6 font-[Montserrat] bg-slate-50 border-t border-gray-100'
         >
            {/* Header */}
            <div className='text-center max-w-3xl'>
               <div className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200'>
                  <MdSchool size={16} />
                  <span>Academic Programs & Degrees</span>
               </div>
               <h2 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-1 mb-3 tracking-tight'>
                  {heading}
               </h2>
               <p className='text-gray-600 text-sm sm:text-base leading-relaxed font-[Poppins] max-w-2xl mx-auto'>
                  {introduction}
               </p>
            </div>

            {/* Filter and Search Bar */}
            <div className='w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4 mt-2 mb-2'>
               {/* Search Input */}
               <div className='relative w-full md:w-80'>
                  <MdSearch
                     size={20}
                     className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400'
                  />
                  <input
                     type='text'
                     value={searchQuery}
                     onChange={e => setSearchQuery(e.target.value)}
                     placeholder='Search programs, codes, keywords...'
                     className='w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition shadow-sm'
                  />
               </div>

               {/* Department Filter Pills */}
               {departments.length > 1 && (
                  <div className='flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 max-w-full'>
                     {departments.map(dept => (
                        <button
                           key={dept}
                           onClick={() => setSelectedDept(dept)}
                           className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                              selectedDept === dept
                                 ? 'bg-blue-600 text-white shadow-sm'
                                 : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                           }`}
                        >
                           {dept}
                        </button>
                     ))}
                  </div>
               )}
            </div>

            {/* Pagination Information Pill */}
            {filteredCourses.length > 0 && (
               <div className='w-full max-w-5xl flex items-center justify-between text-xs text-gray-500 px-1'>
                  <span>
                     Showing{' '}
                     <strong className='text-gray-900 font-semibold'>
                        {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredCourses.length)}
                     </strong>{' '}
                     of <strong className='text-gray-900 font-semibold'>{filteredCourses.length}</strong> programs
                  </span>
                  {totalPages > 1 && (
                     <span>
                        Page {currentPage} of {totalPages}
                     </span>
                  )}
               </div>
            )}

            {/* Course Cards Grid */}
            {paginatedCourses.length > 0 ? (
               <div className='w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-2'>
                  {paginatedCourses.map((data, index) => (
                     <CourseCard key={data._id || index} data={data} />
                  ))}
               </div>
            ) : (
               <div className='w-full max-w-md bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm my-6'>
                  <MdSchool size={36} className='text-gray-400 mx-auto mb-2' />
                  <h4 className='text-base font-bold text-gray-800 mb-1'>No programs match your search</h4>
                  <p className='text-xs text-gray-500 mb-4'>Try adjusting your search criteria or filter tags.</p>
                  <button
                     onClick={() => {
                        setSearchQuery('');
                        setSelectedDept('All');
                     }}
                     className='px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition'
                  >
                     Reset Filters
                  </button>
               </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
               <div className='flex items-center gap-2 mt-6'>
                  <button
                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                     disabled={currentPage === 1}
                     className='inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm'
                  >
                     <MdChevronLeft size={18} />
                     <span>Previous</span>
                  </button>

                  <div className='flex items-center gap-1'>
                     {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                           <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-8 h-8 rounded-xl text-xs font-semibold transition ${
                                 currentPage === pageNum
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                              }`}
                           >
                              {pageNum}
                           </button>
                        );
                     })}
                  </div>

                  <button
                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                     disabled={currentPage === totalPages}
                     className='inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm'
                  >
                     <span>Next</span>
                     <MdChevronRight size={18} />
                  </button>
               </div>
            )}
         </section>
      </Suspense>
   );
};

export default Courses;
