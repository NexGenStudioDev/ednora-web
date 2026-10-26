import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Contact_EndPoint } from '../utils/constants';
import {
   FaFacebook,
   FaInstagram,
   FaLinkedin,
   FaPhoneAlt,
   FaEnvelope,
   FaMapMarkerAlt,
   FaClock,
   FaPaperPlane,
   FaUser,
} from 'react-icons/fa';
import { MdEmail, MdSchool, MdCheckCircle } from 'react-icons/md';
import useSocialLinks from '../hooks/useSocialLinks';
import socket from '../config/socket.mjs';

const Form_schema = yup
   .object({
      cName: yup
         .string()
         .trim()
         .min(3, 'Name must be at least 3 characters')
         .required('Full Name is required'),
      cEmail: yup
         .string()
         .trim()
         .email('Please enter a valid email address')
         .required('Email address is required'),
      cNumber: yup
         .string()
         .trim()
         .required('Phone number is required')
         .matches(/^[0-9+\s-]{7,15}$/, 'Please enter a valid phone number (7-15 digits)'),
      cMessage: yup
         .string()
         .trim()
         .min(10, 'Message must be at least 10 characters')
         .max(500, 'Message cannot exceed 500 characters')
         .required('Message is required'),
   })
   .required();

const ContactUs = () => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const socialLinks = useSocialLinks();

   useEffect(() => {
      if (!socket.connected) {
         socket.connect();
      }
   }, []);

   const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(Form_schema),
      defaultValues: {
         cName: '',
         cEmail: '',
         cNumber: '',
         cMessage: '',
      },
   });

   const messageValue = watch('cMessage') || '';

   const onSubmit = async data => {
      setIsSubmitting(true);
      try {
         // Prepare payload with clean numerical conversion for cNumber
         const cleanNumber = data.cNumber.replace(/\D/g, '');
         const payload = {
            cName: data.cName.trim(),
            cEmail: data.cEmail.trim(),
            cNumber: Number(cleanNumber) || data.cNumber,
            cMessage: data.cMessage.trim(),
         };

         const response = await axios.post(Contact_EndPoint, payload);

         if (socket?.connected) {
            socket.emit('Request_DashBoard_Data');
         }

         Swal.fire({
            icon: 'success',
            title: 'Message Sent Successfully!',
            text:
               response.data?.message ||
               'Thank you for reaching out to CIITM Dhanbad. Our counseling and admissions team will contact you shortly.',
            confirmButtonColor: '#2563eb',
         });
         reset();
      } catch (error) {
         console.error('Contact submit error:', error);
         Swal.fire({
            icon: 'error',
            title: 'Unable to Send Message',
            text:
               error.response?.data?.message ||
               error.response?.data ||
               'Could not connect to the admissions server. Please call us directly or retry.',
            confirmButtonColor: '#ef4444',
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className='min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-12'>
         {/* Page Header */}
         <div className='max-w-7xl mx-auto mb-12 text-center'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200'>
               <MdSchool size={16} />
               <span>Ednora Admissions & Student Helpdesk</span>
            </div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight'>
               Get in Touch with Ednora
            </h1>
            <p className='mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
               Have queries regarding BCA, BBA, campus life, admissions, or fees? Our dedicated faculty and counselors are here to guide you.
            </p>
         </div>

         {/* Main Content Grid */}
         <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
            {/* Left Column: Campus Info & Contact Details */}
            <div className='lg:col-span-5 space-y-6'>
               {/* Institute Overview Card */}
               <div className='bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden'>
                  <div className='absolute -right-8 -bottom-8 w-40 h-40 bg-blue-50 rounded-full blur-2xl pointer-events-none'></div>

                  <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-2'>
                     Ednora Academy of Technology & Management
                  </h2>
                  <p className='text-sm text-gray-600 leading-relaxed mb-6'>
                     Where Knowledge Finds Its Future. Premier technical institution imparting quality education in computer applications, IT certifications, and modern computing.
                  </p>

                  <div className='space-y-5'>
                     {/* Location */}
                     <div className='flex items-start gap-4'>
                        <div className='w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100'>
                           <FaMapMarkerAlt size={18} />
                        </div>
                        <div>
                           <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                              Campus Address
                           </h3>
                           <p className='text-sm font-medium text-gray-800 mt-0.5'>
                              Ednora Campus, Knowledge City, Dhanbad, Jharkhand - 826001, India
                           </p>
                        </div>
                     </div>

                     {/* Phone */}
                     <div className='flex items-start gap-4'>
                        <div className='w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100'>
                           <FaPhoneAlt size={16} />
                        </div>
                        <div>
                           <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                              Direct Helplines
                           </h3>
                           <p className='text-sm font-semibold text-gray-800 mt-0.5'>
                              <a href='tel:+919661342993' className='hover:text-blue-600 transition'>
                                 +91 96613 42993
                              </a>
                           </p>
                           <p className='text-xs text-gray-500'>
                              Admissions Line: +91 98765 43210
                           </p>
                        </div>
                     </div>

                     {/* Email */}
                     <div className='flex items-start gap-4'>
                        <div className='w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100'>
                           <FaEnvelope size={16} />
                        </div>
                        <div>
                           <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                              Official Emails
                           </h3>
                           <p className='text-sm font-semibold text-gray-800 mt-0.5'>
                              <a href='mailto:info@ednora.edu' className='hover:text-blue-600 transition'>
                                 info@ednora.edu
                              </a>
                           </p>
                           <p className='text-xs text-gray-500'>
                              Admissions: admissions@ednora.edu
                           </p>
                        </div>
                     </div>

                     {/* Office Hours */}
                     <div className='flex items-start gap-4'>
                        <div className='w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100'>
                           <FaClock size={16} />
                        </div>
                        <div>
                           <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                              Visiting & Desk Hours
                           </h3>
                           <p className='text-sm font-medium text-gray-800 mt-0.5'>
                              Monday – Saturday: 9:00 AM – 5:30 PM IST
                           </p>
                           <p className='text-xs text-gray-500'>
                              Sunday: Closed (Online admissions active 24/7)
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Social Handles */}
                  <div className='mt-8 pt-6 border-t border-gray-100'>
                     <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
                        Connect with us on Social Platforms
                     </p>
                     <div className='flex items-center gap-3'>
                        {socialLinks?.facebook && (
                           <a
                              href={socialLinks.facebook}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label='Ednora Facebook'
                              className='w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shadow-sm'
                           >
                              <FaFacebook size={18} />
                           </a>
                        )}
                        {socialLinks?.instagram && (
                           <a
                              href={socialLinks.instagram}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label='Ednora Instagram'
                              className='w-10 h-10 rounded-xl bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition shadow-sm'
                           >
                              <FaInstagram size={18} />
                           </a>
                        )}
                        {socialLinks?.linkedin && (
                           <a
                              href={socialLinks.linkedin}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label='Ednora LinkedIn'
                              className='w-10 h-10 rounded-xl bg-blue-800 text-white flex items-center justify-center hover:bg-blue-900 transition shadow-sm'
                           >
                              <FaLinkedin size={18} />
                           </a>
                        )}
                        {socialLinks?.email && (
                           <a
                              href={`mailto:${socialLinks.email}`}
                              aria-label='Email Ednora'
                              className='w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition shadow-sm'
                           >
                              <MdEmail size={20} />
                           </a>
                        )}
                     </div>
                  </div>
               </div>

               {/* Quick Response Pledge */}
               <div className='bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-md'>
                  <div className='flex items-center gap-2 font-bold text-base mb-2'>
                     <MdCheckCircle size={20} className='text-emerald-300' />
                     <span>Guaranteed Rapid Response</span>
                  </div>
                  <p className='text-xs sm:text-sm text-blue-100 leading-relaxed'>
                     All course inquiries, prospective admission questions, and syllabus counseling queries submitted through this portal receive a personalized reply within one working day.
                  </p>
               </div>
            </div>

            {/* Right Column: Interactive Inquiry Form */}
            <div className='lg:col-span-7'>
               <div className='bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 relative'>
                  <div className='mb-8'>
                     <h2 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                        Send an Inquiry
                     </h2>
                     <p className='text-sm text-gray-500 mt-1'>
                        Please fill in your details below and our team will get in touch.
                     </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                     {/* Full Name */}
                     <div>
                        <label
                           htmlFor='cName'
                           className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'
                        >
                           Full Name <span className='text-red-500'>*</span>
                        </label>
                        <div className='relative'>
                           <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
                              <FaUser size={14} />
                           </div>
                           <input
                              id='cName'
                              type='text'
                              {...register('cName')}
                              placeholder='e.g. Rahul Sharma'
                              className={`w-full pl-10 pr-4 py-3 bg-gray-50/70 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                                 errors.cName
                                    ? 'border-red-400 focus:ring-red-200'
                                    : 'border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-100'
                              }`}
                           />
                        </div>
                        {errors.cName && (
                           <p className='mt-1.5 text-xs text-red-600 font-medium'>
                              {errors.cName.message}
                           </p>
                        )}
                     </div>

                     {/* Two Columns: Email and Phone */}
                     <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        {/* Email */}
                        <div>
                           <label
                              htmlFor='cEmail'
                              className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'
                           >
                              Email Address <span className='text-red-500'>*</span>
                           </label>
                           <div className='relative'>
                              <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
                                 <FaEnvelope size={14} />
                              </div>
                              <input
                                 id='cEmail'
                                 type='email'
                                 {...register('cEmail')}
                                 placeholder='name@example.com'
                                 className={`w-full pl-10 pr-4 py-3 bg-gray-50/70 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                                    errors.cEmail
                                       ? 'border-red-400 focus:ring-red-200'
                                       : 'border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-100'
                                 }`}
                              />
                           </div>
                           {errors.cEmail && (
                              <p className='mt-1.5 text-xs text-red-600 font-medium'>
                                 {errors.cEmail.message}
                              </p>
                           )}
                        </div>

                        {/* Phone */}
                        <div>
                           <label
                              htmlFor='cNumber'
                              className='block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2'
                           >
                              Phone Number <span className='text-red-500'>*</span>
                           </label>
                           <div className='relative'>
                              <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
                                 <FaPhoneAlt size={14} />
                              </div>
                              <input
                                 id='cNumber'
                                 type='tel'
                                 {...register('cNumber')}
                                 placeholder='+91 98765 43210'
                                 className={`w-full pl-10 pr-4 py-3 bg-gray-50/70 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                                    errors.cNumber
                                       ? 'border-red-400 focus:ring-red-200'
                                       : 'border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-100'
                                 }`}
                              />
                           </div>
                           {errors.cNumber && (
                              <p className='mt-1.5 text-xs text-red-600 font-medium'>
                                 {errors.cNumber.message}
                              </p>
                           )}
                        </div>
                     </div>

                     {/* Message */}
                     <div>
                        <div className='flex justify-between items-center mb-2'>
                           <label
                              htmlFor='cMessage'
                              className='block text-xs font-semibold text-gray-700 uppercase tracking-wider'
                           >
                              Your Message / Inquiry <span className='text-red-500'>*</span>
                           </label>
                           <span className='text-[11px] text-gray-400'>
                              {messageValue.length}/500 chars
                           </span>
                        </div>
                        <textarea
                           id='cMessage'
                           rows={5}
                           {...register('cMessage')}
                           placeholder='Please describe the course or question you would like assistance with (minimum 10 characters)...'
                           className={`w-full p-4 bg-gray-50/70 border rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 resize-none transition ${
                              errors.cMessage
                                 ? 'border-red-400 focus:ring-red-200'
                                 : 'border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-100'
                           }`}
                        ></textarea>
                        {errors.cMessage && (
                           <p className='mt-1.5 text-xs text-red-600 font-medium'>
                              {errors.cMessage.message}
                           </p>
                        )}
                     </div>

                     {/* Submit Button */}
                     <button
                        type='submit'
                        disabled={isSubmitting}
                        className='w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
                     >
                        <FaPaperPlane size={14} className={isSubmitting ? 'animate-pulse' : ''} />
                        <span>{isSubmitting ? 'Sending Your Inquiry...' : 'Submit Inquiry'}</span>
                     </button>

                     <p className='text-center text-xs text-gray-400'>
                        By submitting, you agree to allow CIITM counselors to contact you regarding educational programs.
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactUs;
