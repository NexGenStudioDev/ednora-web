import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { resetPasswordSchema } from '../../validation/resetPassword.schema';

import resetImage from '../../assets/images/reset.jpg';
import logo from '../../assets/images/logo.png';
import { EDNORA_LOGO_URL } from '../../config/frontend.config.js';
import { toast } from 'react-toastify';
import axios from 'axios';

const ResetPassword = () => {
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(resetPasswordSchema),
      mode: 'onChange',
   });

   const onSubmit = async data => {
      try {
         setLoading(true);
         await axios.post('/api/v1/validate/password', {
            email: data.email,
            otp: data.otp,
            newPassword: data.password,
         });
         toast.success('Password reset successful');
         navigate('/login');
      } catch (error) {
         toast.error(
            error.response?.data?.message || 'An error occurred',
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className='w-full min-h-screen flex flex-col md:items-start items-center justify-center lg:flex-row'>
         <div className='hidden lg:block w-1/2 h-screen'>
            <img
               className='w-full h-full object-cover pointer-events-none'
               src={resetImage}
               alt='Reset Password Illustration'
            />
         </div>

         <div className='w-full lg:w-1/2 h-full px-[5vw] pt-[12vh] flex flex-col items-start justify-center text-[#333] rounded-md'>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='w-full bg-[#FAFAFA] p-[clamp(1rem,4vw,2rem)] flex flex-col justify-center'
            >
               <div className='logo mb-[clamp(1rem,2vw,1.5rem)]'>
                  <img
                     src={logo || EDNORA_LOGO_URL}
                     alt='Ednora Logo'
                     className='h-8 w-auto object-contain'
                  />
               </div>

               <h1 className='text-[clamp(1.4rem,2vw,2rem)] font-semibold mb-[clamp(1rem,2vw,1.5rem)]'>
                  Reset your password
               </h1>

               <p className='text-[clamp(0.85rem,1.5vw,1rem)] text-gray-600 mb-[clamp(1rem,2vw,1.5rem)]'>
                  Enter the OTP sent to your email and set your new
                  password.
               </p>

               <input
                  type='email'
                  placeholder='Email'
                  {...register('email')}
                  className='border border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-[clamp(0.6rem,1.2vw,1rem)] w-full text-[clamp(0.9rem,1.2vw,1rem)] mb-2'
               />
               {errors.email && (
                  <span className='text-red-400 text-sm'>
                     {errors.email.message}
                  </span>
               )}

               <input
                  type='text'
                  placeholder='OTP'
                  {...register('otp')}
                  className='border border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-[clamp(0.6rem,1.2vw,1rem)] w-full text-[clamp(0.9rem,1.2vw,1rem)] my-2'
               />
               {errors.otp && (
                  <span className='text-red-400 text-sm'>
                     {errors.otp.message}
                  </span>
               )}

               <div className='relative'>
                  <input
                     type={showPassword ? 'text' : 'password'}
                     placeholder='New Password'
                     {...register('password')}
                     className='border border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-[clamp(0.6rem,1.2vw,1rem)] w-full text-[clamp(0.9rem,1.2vw,1rem)] pr-10'
                  />
                  <button
                     type='button'
                     onClick={() => setShowPassword(prev => !prev)}
                     className='absolute right-4 top-1/2 transform -translate-y-1/2 text-xl'
                  >
                     {showPassword ? '🙈' : '👁️'}
                  </button>
               </div>
               {errors.password && (
                  <span className='text-red-400 text-sm'>
                     {errors.password.message}
                  </span>
               )}

               <div className='flex w-full items-center justify-center gap-6 my-[clamp(1rem,2vw,1.5rem)] flex-col md:flex-row'>
                  <button
                     type='submit'
                     disabled={loading}
                     className='bg-[#333] text-white font-medium rounded-lg p-[clamp(0.8rem,1.5vw,1.2rem)] w-full md:w-1/2 text-[clamp(1rem,1.3vw,1.2rem)] disabled:bg-gray-200'
                  >
                     {loading ? 'Loading...' : 'Change Password'}
                  </button>
               </div>

               <p className='mt-4 text-[clamp(0.8rem,1vw,1rem)] font-semibold'>
                  Go back to{' '}
                  <Link to='/login' className='text-[#B83D00]'>
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </section>
   );
};

export default ResetPassword;
