import { useState } from 'react';
import ValidateUniqueIdInput from '../components/Atoms/Input/ValidateUniqueIdInput';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
   MdCheckCircle,
   MdHourglassEmpty,
   MdCancel,
   MdSearch,
   MdBadge,
   MdPerson,
   MdEmail,
   MdPhone,
   MdSchool,
   MdInfo,
} from 'react-icons/md';

const StatusPage = () => {
   const [studentId, setStudentId] = useState('');
   const [statusResult, setStatusResult] = useState(null);
   const [studentDetails, setStudentDetails] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [hasSearched, setHasSearched] = useState(false);

   const handleSearch = async () => {
      const cleanId = studentId ? studentId.trim() : '';
      if (!cleanId) {
         Swal.fire({
            icon: 'warning',
            title: 'Enter Student ID',
            text: 'Please enter a valid Application Unique ID or Student ID to track status.',
            confirmButtonColor: '#2563eb',
         });
         return;
      }

      setIsLoading(true);
      setHasSearched(true);
      setStatusResult(null);
      setStudentDetails(null);

      try {
         // Query official application status by uniqueId
         const statusRes = await axios.get(
            `/api/v1/status/find/${encodeURIComponent(cleanId)}`,
         );

         if (statusRes.data?.data) {
            setStatusResult(statusRes.data.data);
         } else if (statusRes.data && !statusRes.data.error) {
            setStatusResult(statusRes.data);
         }

         // Try enriching with Student Directory info if available
         try {
            const studentRes = await axios.get(
               `/api/v1/Student/FindByUniqueId?uniqueId=${encodeURIComponent(cleanId)}`,
            );
            if (studentRes.data?.data) {
               setStudentDetails(studentRes.data.data);
            }
         } catch {
            // Student record lookup is optional if only in applicant stage
         }
      } catch (error) {
         console.warn('Status lookup notice:', error);
         setStatusResult(null);
         Swal.fire({
            icon: 'info',
            title: 'No Application Record Found',
            text:
               error.response?.data?.message ||
               `No admission or enrollment status found for "${cleanId}". Please verify your unique ID or contact CIITM admissions desk.`,
            confirmButtonColor: '#2563eb',
         });
      } finally {
         setIsLoading(false);
      }
   };

   // Extract status state
   const currentStatus =
      statusResult?.applicationStatus ||
      statusResult?.status ||
      (statusResult ? 'Under Review' : null);

   const statusMessage =
      statusResult?.message ||
      (currentStatus === 'Approved'
         ? 'Your application has been verified and approved.'
         : currentStatus === 'Pending'
         ? 'Your admission application is currently under review by the admissions committee.'
         : null);

   return (
      <div className='min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-12'>
         {/* Page Header */}
         <div className='max-w-4xl mx-auto mb-8 text-center'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200'>
               <MdBadge size={16} />
               <span>CIITM Admissions & Enrollment Verification</span>
            </div>
            <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight'>
               Track Application & Student Status
            </h1>
            <p className='mt-2 text-sm sm:text-base text-gray-600 max-w-xl mx-auto'>
               Enter your unique registration ID (e.g. CIITM-2026-XXXX) to check document review, verification progress, and enrollment confirmation.
            </p>
         </div>

         {/* Search Box Card */}
         <div className='max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8'>
            <label
               htmlFor='unique_id_search'
               className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'
            >
               Application Unique ID / Student ID
            </label>

            <div className='flex flex-col sm:flex-row items-center gap-3'>
               <div className='w-full'>
                  <ValidateUniqueIdInput
                     getValidationStatus={() => {}}
                     getStudentId={id => setStudentId(id)}
                     placeholder='e.g. CIITM-2026-9842'
                     className='w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition'
                  />
               </div>

               <button
                  type='button'
                  disabled={isLoading}
                  onClick={handleSearch}
                  className='w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-60 disabled:cursor-not-allowed'
               >
                  <MdSearch size={20} />
                  <span>{isLoading ? 'Checking...' : 'Check Status'}</span>
               </button>
            </div>
         </div>

         {/* Results Display Area */}
         {statusResult ? (
            <div className='max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 animate-in fade-in duration-300'>
               {/* Status Badge Header */}
               <div className='flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100'>
                  <div>
                     <span className='text-xs font-semibold uppercase tracking-wider text-gray-400'>
                        Registration ID
                     </span>
                     <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mt-0.5'>
                        {statusResult.uniqueId || studentId}
                     </h2>
                  </div>

                  <div>
                     {String(currentStatus).toLowerCase() === 'approved' ? (
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm'>
                           <MdCheckCircle size={20} className='text-emerald-500' />
                           <span>Application Approved</span>
                        </div>
                     ) : String(currentStatus).toLowerCase() === 'rejected' ? (
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-bold text-sm'>
                           <MdCancel size={20} className='text-red-500' />
                           <span>Application Rejected</span>
                        </div>
                     ) : (
                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-sm'>
                           <MdHourglassEmpty size={20} className='text-amber-500' />
                           <span>Review in Progress</span>
                        </div>
                     )}
                  </div>
               </div>

               {/* Official Message Banner */}
               {statusMessage && (
                  <div className='mt-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-3'>
                     <MdInfo size={20} className='text-blue-600 shrink-0 mt-0.5' />
                     <div>
                        <h3 className='text-xs font-bold text-blue-900 uppercase tracking-wider'>
                           Official Admissions Remark
                        </h3>
                        <p className='text-sm text-gray-700 mt-0.5 leading-relaxed'>
                           {statusMessage}
                        </p>
                     </div>
                  </div>
               )}

               {/* Student Details Grid (if available from backend) */}
               {studentDetails && (
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100'>
                     {studentDetails.student?.firstName && (
                        <div className='flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100'>
                           <MdPerson size={20} className='text-blue-600 shrink-0' />
                           <div>
                              <p className='text-[11px] text-gray-400 uppercase font-semibold'>Student Name</p>
                              <p className='text-sm font-bold text-gray-800'>
                                 {studentDetails.student.firstName} {studentDetails.student.lastName || ''}
                              </p>
                           </div>
                        </div>
                     )}

                     {studentDetails.student?.course && (
                        <div className='flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100'>
                           <MdSchool size={20} className='text-blue-600 shrink-0' />
                           <div>
                              <p className='text-[11px] text-gray-400 uppercase font-semibold'>Enrolled Course</p>
                              <p className='text-sm font-bold text-gray-800'>
                                 {studentDetails.student.course}
                                 {studentDetails.student.semester ? ` - Sem ${studentDetails.student.semester}` : ''}
                              </p>
                           </div>
                        </div>
                     )}

                     {studentDetails.student?.email && (
                        <div className='flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100'>
                           <MdEmail size={20} className='text-blue-600 shrink-0' />
                           <div>
                              <p className='text-[11px] text-gray-400 uppercase font-semibold'>Registered Email</p>
                              <p className='text-sm font-medium text-gray-800 truncate'>
                                 {Array.isArray(studentDetails.student.email)
                                    ? studentDetails.student.email[0]
                                    : studentDetails.student.email}
                              </p>
                           </div>
                        </div>
                     )}

                     {studentDetails.student?.phoneNumber && (
                        <div className='flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100'>
                           <MdPhone size={20} className='text-blue-600 shrink-0' />
                           <div>
                              <p className='text-[11px] text-gray-400 uppercase font-semibold'>Phone Number</p>
                              <p className='text-sm font-medium text-gray-800'>
                                 {studentDetails.student.phoneNumber}
                              </p>
                           </div>
                        </div>
                     )}
                  </div>
               )}
            </div>
         ) : hasSearched && !isLoading ? (
            <div className='max-w-xl mx-auto bg-white rounded-3xl p-8 text-center shadow-sm border border-gray-100'>
               <div className='w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3'>
                  <MdBadge size={28} />
               </div>
               <h3 className='text-lg font-bold text-gray-900 mb-1'>No Status Record Found</h3>
               <p className='text-xs sm:text-sm text-gray-500 mb-4'>
                  We could not find an admission record for ID &ldquo;{studentId}&rdquo;. Please verify your ID or reach out to CIITM admissions.
               </p>
               <a
                  href='tel:+919431125555'
                  className='inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold transition'
               >
                  <MdPhone size={14} />
                  <span>Call Admissions Helpdesk: +91 94311 25555</span>
               </a>
            </div>
         ) : null}
      </div>
   );
};

export default StatusPage;
