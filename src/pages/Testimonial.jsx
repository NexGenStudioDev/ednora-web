import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import {
   MdStar,
   MdFormatQuote,
   MdSchool,
   MdAddComment,
   MdClose,
   MdCloudUpload,
   MdVerified,
} from 'react-icons/md';

const Testimonial = () => {
   const [testimonialsList, setTestimonialsList] = useState([]);
   const [isLoadingList, setIsLoadingList] = useState(true);
   const [showSubmitModal, setShowSubmitModal] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   // Form states
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [jobRole, setJobRole] = useState('');
   const [star, setStar] = useState(5);
   const [testimonial, setTestimonial] = useState('');
   const [imageFile, setImageFile] = useState(null);
   const [previewImage, setPreviewImage] = useState(null);
   const fileRef = useRef(null);

   // Fetch approved testimonials from backend
   const fetchTestimonials = async () => {
      setIsLoadingList(true);
      try {
         const res = await axios.get('/api/v1/findAllTestimonials');
         const list =
            res.data?.data || res.data?.Find_Testimonial || [];
         setTestimonialsList(list);
      } catch (err) {
         console.error('Error fetching testimonials:', err);
      } finally {
         setIsLoadingList(false);
      }
   };

   useEffect(() => {
      fetchTestimonials();
   }, []);

   const handleImageChange = e => {
      const file = e.target.files[0];
      if (file) {
         setImageFile(file);
         const reader = new FileReader();
         reader.onloadend = () => {
            setPreviewImage(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSubmit = async e => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         const form = new FormData();
         form.append('name', name.trim());
         form.append('email', email.trim());
         form.append('job_Role', jobRole.trim());
         form.append('star', Number(star));
         form.append('message', testimonial.trim());

         if (imageFile) {
            form.append('image', imageFile);
         }

         const res = await axios.post(
            '/api/v1/createTestimonial',
            form,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            },
         );

         Swal.fire({
            title: 'Thank You!',
            text:
               res.data?.message ||
               'Your testimonial has been submitted successfully for verification.',
            icon: 'success',
            confirmButtonColor: '#2563eb',
         });

         // Reset form
         setName('');
         setEmail('');
         setJobRole('');
         setStar(5);
         setTestimonial('');
         setImageFile(null);
         setPreviewImage(null);
         setShowSubmitModal(false);

         // Refresh testimonials list
         fetchTestimonials();
      } catch (error) {
         console.error('Testimonial submit error:', error);
         toast.error(
            error.response?.data?.message ||
               'Something went wrong while submitting your testimonial.',
         );
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className='min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-12'>
         {/* Page Header */}
         <div className='max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6'>
            <div>
               <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-200'>
                  <MdSchool size={16} />
                  <span>Ednora Community Voices</span>
               </div>
               <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight'>
                  Experiences That Inspire Us
               </h1>
               <p className='mt-2 text-sm sm:text-base text-gray-600 max-w-2xl'>
                  Every learning journey is different. Student experiences can offer a valuable perspective on the teaching, resources, and opportunities that shape life at an institution.
               </p>
            </div>

            <button
               onClick={() => setShowSubmitModal(true)}
               className='inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-sm shadow-md transition shrink-0'
            >
               <MdAddComment size={20} />
               <span>Share Your Experience</span>
            </button>
         </div>

         {/* Testimonials Grid from Real Backend */}
         <div className='max-w-7xl mx-auto'>
            {isLoadingList ? (
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {[...Array(6)].map((_, i) => (
                     <div
                        key={i}
                        className='bg-white rounded-3xl p-6 h-64 border border-gray-100 animate-pulse'
                     />
                  ))}
               </div>
            ) : testimonialsList.length === 0 ? (
               <div className='bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-100 max-w-md mx-auto my-12'>
                  <div className='w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3'>
                     <MdSchool size={32} />
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 mb-1'>
                     No Testimonials Yet
                  </h3>
                  <p className='text-xs text-gray-500 mb-6'>
                     Be the first student or alumnus to share your
                     experience with CIITM!
                  </p>
                  <button
                     onClick={() => setShowSubmitModal(true)}
                     className='px-5 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 transition'
                  >
                     Submit a Testimonial
                  </button>
               </div>
            ) : (
               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {testimonialsList.map((item, idx) => {
                     const starsCount = Math.min(
                        Math.max(Number(item.star) || 5, 1),
                        5,
                     );
                     const avatarUrl =
                        item.image ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || 'Student')}&background=2563eb&color=fff`;

                     return (
                        <div
                           key={item._id || idx}
                           className='bg-white  rounded-3xl p-6 sm:p-7 shadow-sm border border-black flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden'
                        >
                           <div className='absolute top-4 right-4 text-gray-100 pointer-events-none'>
                              <MdFormatQuote size={64} />
                           </div>

                           <div>
                              {/* Star Rating */}
                              <div className='flex items-center gap-1 mb-4'>
                                 {[...Array(5)].map((_, i) => (
                                    <MdStar
                                       key={i}
                                       size={18}
                                       className={
                                          i < starsCount
                                             ? 'text-amber-400'
                                             : 'text-gray-200'
                                       }
                                    />
                                 ))}
                              </div>

                              {/* Message */}
                              <p className='text-sm text-gray-700 leading-relaxed relative z-10 mb-6'>
                                 &ldquo;{item.message}&rdquo;
                              </p>
                           </div>

                           {/* Author Card */}
                           <div className='flex items-center gap-3 pt-4 border-t border-gray-100 mt-2'>
                              <img
                                 src={avatarUrl}
                                 alt={item.name}
                                 className='w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm'
                                 onError={e => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name || 'Student')}&background=2563eb&color=fff`;
                                 }}
                              />
                              <div>
                                 <div className='flex items-center gap-1'>
                                    <h3 className='text-sm font-bold text-gray-900'>
                                       {item.name}
                                    </h3>
                                    <MdVerified
                                       size={15}
                                       className='text-blue-600'
                                    />
                                 </div>
                                 <p className='text-xs text-gray-500 font-medium'>
                                    {item.job_Role || 'CIITM Student'}
                                 </p>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            )}
         </div>

         {/* Submit Testimonial Modal */}
         {showSubmitModal && (
            <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
               <div className='bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto'>
                  <button
                     onClick={() => setShowSubmitModal(false)}
                     className='absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition'
                     aria-label='Close'
                  >
                     <MdClose size={22} />
                  </button>

                  <div className='mb-6'>
                     <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>
                        Share Your Experience
                     </h2>
                     <p className='text-xs text-gray-500 mt-1'>
                        Your feedback inspires future students and
                        helps improve institutional programs.
                     </p>
                  </div>

                  <form onSubmit={handleSubmit} className='space-y-4'>
                     {/* Photo Upload */}
                     <div className='flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-200'>
                        <div
                           onClick={() => fileRef.current?.click()}
                           className='w-16 h-16 rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-blue-500 transition shrink-0'
                        >
                           {previewImage ? (
                              <img
                                 src={previewImage}
                                 alt='Preview'
                                 className='w-full h-full object-cover'
                              />
                           ) : (
                              <MdCloudUpload
                                 size={24}
                                 className='text-gray-400'
                              />
                           )}
                        </div>
                        <div>
                           <button
                              type='button'
                              onClick={() => fileRef.current?.click()}
                              className='text-xs font-semibold text-blue-600 hover:text-blue-800'
                           >
                              {previewImage
                                 ? 'Change Photo'
                                 : 'Upload Profile Picture'}
                           </button>
                           <p className='text-[10px] text-gray-400'>
                              JPG, PNG up to 5MB
                           </p>
                        </div>
                        <input
                           type='file'
                           accept='image/*'
                           ref={fileRef}
                           onChange={handleImageChange}
                           className='hidden'
                        />
                     </div>

                     <div>
                        <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1'>
                           Your Full Name *
                        </label>
                        <input
                           type='text'
                           required
                           value={name}
                           onChange={e => setName(e.target.value)}
                           placeholder='e.g. Abhishek Gupta'
                           className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500'
                        />
                     </div>

                     <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        <div>
                           <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1'>
                              Email Address *
                           </label>
                           <input
                              type='email'
                              required
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              placeholder='name@example.com'
                              className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500'
                           />
                        </div>

                        <div>
                           <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1'>
                              Role / Batch *
                           </label>
                           <input
                              type='text'
                              required
                              value={jobRole}
                              onChange={e =>
                                 setJobRole(e.target.value)
                              }
                              placeholder='e.g. BCA Student / Alumnus'
                              className='w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500'
                           />
                        </div>
                     </div>

                     <div>
                        <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1'>
                           Your Testimonial Message *
                        </label>
                        <textarea
                           required
                           rows={4}
                           value={testimonial}
                           onChange={e =>
                              setTestimonial(e.target.value)
                           }
                           placeholder='Share your thoughts about CIITM faculty, courses, campus life, or career support...'
                           className='w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:border-blue-500 resize-none'
                        />
                     </div>

                     <div>
                        <label className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1'>
                           Rating
                        </label>
                        <div className='flex items-center gap-1.5'>
                           {[1, 2, 3, 4, 5].map(starNum => (
                              <button
                                 key={starNum}
                                 type='button'
                                 onClick={() => setStar(starNum)}
                                 className='p-1 focus:outline-none'
                              >
                                 <MdStar
                                    size={26}
                                    className={
                                       starNum <= star
                                          ? 'text-amber-400'
                                          : 'text-gray-200'
                                    }
                                 />
                              </button>
                           ))}
                           <span className='text-xs font-bold text-gray-600 ml-2'>
                              {star} / 5 Stars
                           </span>
                        </div>
                     </div>

                     <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl text-sm shadow-md transition disabled:opacity-60'
                     >
                        {isSubmitting
                           ? 'Submitting Testimonial...'
                           : 'Submit Testimonial'}
                     </button>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
};

export default Testimonial;
