import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
   MdAccessTime,
   MdCurrencyRupee,
   MdSchool,
   MdArrowBack,
   MdArrowForward,
   MdPeople,
   MdQrCode,
   MdDescription,
   MdCheckCircle,
} from 'react-icons/md';

const ViewCourseDetail = () => {
   const [courseData, setCourseData] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   const { id } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchCourseById = async courseId => {
         setIsLoading(true);
         setError(null);
         try {
            const res = await axios.get(
               `/api/v1/user/findCourseById/${courseId}`,
            );
            const data = res.data?.data || null;
            if (data) {
               setCourseData(data);
            } else {
               setError('Course not found');
            }
         } catch (err) {
            console.error('Error fetching course:', err);
            setError(
               err.response?.data?.message ||
                  err.message ||
                  'An unexpected error occurred while fetching course details',
            );
         } finally {
            setIsLoading(false);
         }
      };

      if (id) {
         fetchCourseById(id);
      }
   }, [id]);

   if (isLoading) {
      return (
         <div className='min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-12 flex items-center justify-center'>
            <div className='bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-sm border border-gray-100 animate-pulse'>
               <div className='w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4'></div>
               <div className='h-6 bg-gray-200 rounded-xl w-3/4 mx-auto mb-3'></div>
               <div className='h-4 bg-gray-200 rounded-lg w-1/2 mx-auto'></div>
            </div>
         </div>
      );
   }

   if (error || !courseData) {
      return (
         <div className='min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-12 flex items-center justify-center'>
            <div className='bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-sm border border-gray-100'>
               <div className='w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4'>
                  <MdQrCode size={32} />
               </div>
               <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                  Course Not Found
               </h2>
               <p className='text-sm text-gray-500 mb-6'>
                  {error || 'No course data returned from backend'}
               </p>
               <button
                  onClick={() => navigate(-1)}
                  className='w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition'
               >
                  Go Back
               </button>
            </div>
         </div>
      );
   }

   // Extract ONLY data provided by the backend response
   const courseName = courseData.courseName || courseData.name;
   const courseCode = courseData.courseCode || courseData.code;
   const courseDuration =
      courseData.courseDuration || courseData.duration;
   const coursePrice =
      courseData.coursePrice ?? courseData.fee ?? courseData.price;
   const rawEligibility =
      courseData.courseEligibility ||
      courseData.CourseEligibility ||
      courseData.eligibility;
   const courseEligibility = rawEligibility
      ? String(rawEligibility)
           .replace(/[\\",]+$/, '')
           .trim()
      : null;
   const courseDescription =
      courseData.courseDescription || courseData.description;
   const courseThumbnail =
      courseData.courseThumbnail || courseData.image;
   const admissionCriteria = Array.isArray(
      courseData.AdmissionCriteria,
   )
      ? courseData.AdmissionCriteria
      : [];
   const numberOfStudentsEnrolled =
      courseData.numberOfStudentsEnrolled;

   return (
      <div className='min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-12'>
         {/* Breadcrumbs Navigation */}
         <div className='max-w-6xl mx-auto mb-6'>
            <nav
               className='flex items-center gap-2 text-xs sm:text-sm text-gray-500'
               aria-label='Breadcrumb'
            >
               <Link
                  to='/'
                  className='hover:text-blue-600 transition'
               >
                  Home
               </Link>
               <span>/</span>
               <Link
                  to='/about'
                  className='hover:text-blue-600 transition'
               >
                  Courses
               </Link>
               {courseName && (
                  <>
                     <span>/</span>
                     <span className='text-gray-900 font-medium truncate max-w-[200px] sm:max-w-md'>
                        {courseName}
                     </span>
                  </>
               )}
            </nav>
         </div>

         <div className='max-w-6xl mx-auto space-y-6'>
            {/* Header Card */}
            <div className='bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100'>
               <div className='flex flex-wrap items-center justify-between gap-4 mb-4'>
                  <div className='flex items-center gap-2'>
                     {courseCode && (
                        <span className='px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100'>
                           Code: {courseCode}
                        </span>
                     )}
                     {numberOfStudentsEnrolled !== undefined && (
                        <span className='px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 flex items-center gap-1.5'>
                           <MdPeople
                              size={16}
                              className='text-blue-600'
                           />
                           <span>
                              {numberOfStudentsEnrolled} Enrolled
                           </span>
                        </span>
                     )}
                  </div>

                  <button
                     onClick={() => navigate(-1)}
                     className='p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition text-xs flex items-center gap-1.5 border border-gray-200'
                  >
                     <MdArrowBack size={16} />
                     <span>Back</span>
                  </button>
               </div>

               {courseName && (
                  <h1 className='text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4'>
                     {courseName}
                  </h1>
               )}

               {/* Quick Info Grid for Available Backend Metrics */}
               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-gray-100 mt-6'>
                  {courseDuration && (
                     <div className='flex items-center gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-100'>
                        <div className='w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0'>
                           <MdAccessTime size={22} />
                        </div>
                        <div>
                           <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                              Duration
                           </p>
                           <p className='text-sm sm:text-base font-bold text-gray-900 mt-0.5'>
                              {courseDuration}
                           </p>
                        </div>
                     </div>
                  )}

                  {coursePrice !== undefined &&
                     coursePrice !== null && (
                        <div className='flex items-center gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-100'>
                           <div className='w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0'>
                              <MdCurrencyRupee size={22} />
                           </div>
                           <div>
                              <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                                 Fee
                              </p>
                              <p className='text-sm sm:text-base font-bold text-gray-900 mt-0.5'>
                                 ₹
                                 {Number(coursePrice).toLocaleString(
                                    'en-IN',
                                 )}
                              </p>
                           </div>
                        </div>
                     )}

                  {courseEligibility && (
                     <div className='flex items-center gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-100 sm:col-span-2 lg:col-span-1'>
                        <div className='w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0'>
                           <MdSchool size={22} />
                        </div>
                        <div className='overflow-hidden'>
                           <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
                              Eligibility
                           </p>
                           <p
                              className='text-sm sm:text-base font-bold text-gray-900 mt-0.5 truncate'
                              title={courseEligibility}
                           >
                              {courseEligibility}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Main Content Layout */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
               {/* Left Column */}
               <div className='lg:col-span-8 space-y-6'>
                  {/* Course Thumbnail Image */}
                  {courseThumbnail && (
                     <div className='bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100'>
                        <div className='relative aspect-[16/9] w-full bg-gray-100 overflow-hidden'>
                           <img
                              src={courseThumbnail}
                              alt={courseName || 'Course'}
                              className='w-full h-full object-cover'
                              onError={e => {
                                 e.target.style.display = 'none';
                              }}
                           />
                        </div>
                     </div>
                  )}

                  {/* Course Description */}
                  {courseDescription && (
                     <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100'>
                        <div className='flex items-center gap-2 mb-4'>
                           <MdDescription
                              className='text-blue-600'
                              size={22}
                           />
                           <h2 className='text-xl font-bold text-gray-900'>
                              Course Description
                           </h2>
                        </div>
                        <p className='text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line'>
                           {courseDescription}
                        </p>
                     </div>
                  )}

                  {/* Admission Criteria (Only if provided by backend) */}
                  {admissionCriteria.length > 0 && (
                     <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100'>
                        <h2 className='text-xl font-bold text-gray-900 mb-4'>
                           Admission Criteria
                        </h2>
                        <ul className='space-y-3'>
                           {admissionCriteria.map((item, idx) => (
                              <li
                                 key={idx}
                                 className='flex items-start gap-3 text-sm text-gray-700'
                              >
                                 <MdCheckCircle
                                    className='text-emerald-500 shrink-0 mt-0.5'
                                    size={18}
                                 />
                                 <span>
                                    {typeof item === 'string'
                                       ? item
                                       : JSON.stringify(item)}
                                 </span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}

                  {/* Eligibility Full Detail */}
                  {courseEligibility && (
                     <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100'>
                        <div className='flex items-center gap-2 mb-3'>
                           <MdSchool
                              className='text-purple-600'
                              size={22}
                           />
                           <h2 className='text-xl font-bold text-gray-900'>
                              Eligibility Criteria
                           </h2>
                        </div>
                        <p className='text-sm sm:text-base text-gray-700 leading-relaxed'>
                           {courseEligibility}
                        </p>
                     </div>
                  )}
               </div>

               {/* Right Sidebar Column */}
               <div className='lg:col-span-4 space-y-6 lg:sticky lg:top-28'>
                  <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6'>
                     <h3 className='text-lg font-bold text-gray-900 pb-3 border-b border-gray-100'>
                        Course Details Summary
                     </h3>

                     <div className='space-y-4 text-sm'>
                        {courseCode && (
                           <div className='flex justify-between items-center py-1'>
                              <span className='text-gray-500'>
                                 Course Code
                              </span>
                              <span className='font-bold text-gray-900'>
                                 {courseCode}
                              </span>
                           </div>
                        )}

                        {courseDuration && (
                           <div className='flex justify-between items-center py-1'>
                              <span className='text-gray-500'>
                                 Duration
                              </span>
                              <span className='font-bold text-gray-900'>
                                 {courseDuration}
                              </span>
                           </div>
                        )}

                        {coursePrice !== undefined &&
                           coursePrice !== null && (
                              <div className='flex justify-between items-center py-1'>
                                 <span className='text-gray-500'>
                                    Course Fee
                                 </span>
                                 <span className='font-bold text-emerald-600 text-base'>
                                    ₹
                                    {Number(
                                       coursePrice,
                                    ).toLocaleString('en-IN')}
                                 </span>
                              </div>
                           )}

                        {numberOfStudentsEnrolled !== undefined && (
                           <div className='flex justify-between items-center py-1'>
                              <span className='text-gray-500'>
                                 Enrolled Students
                              </span>
                              <span className='font-bold text-gray-900'>
                                 {numberOfStudentsEnrolled}
                              </span>
                           </div>
                        )}
                     </div>

                     <div className='pt-4 border-t border-gray-100'>
                        <Link
                           to={`/admission${courseName ? `?course=${encodeURIComponent(courseName)}` : ''}`}
                           className='w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-sm shadow-md transition flex items-center justify-center gap-2'
                        >
                           <span>Apply for Admission</span>
                           <MdArrowForward size={18} />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ViewCourseDetail;
