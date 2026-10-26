import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import forgotImage from '../../assets/images/forgot.jpg';
import logo from '../../assets/images/logo.png';
import { EDNORA_LOGO_URL } from '../../config/frontend.config.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchema } from '../../validation/forgotPassword.schema';
import { toast } from 'react-toastify';
import axios from 'axios';

const ForgotPassword = () => {
   const [loading, setLoading] = useState(false);
   let navigate = useNavigate();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: zodResolver(forgotPasswordSchema),
      mode: 'onChange',
   });

   const onSubmit = async data => {
      try {
         setLoading(true);
         await axios.post('/api/v1/forgot-password', {
            email: data.email,
         });

         toast.success('Success');

         setTimeout(() => {
            navigate('/reset-password');
         }, 1000);
      } catch (error) {
         console.error('Error during password reset:', error);
         toast.error(
            error.response?.data?.message || 'An error occurred',
         );
      } finally {
         setLoading(false);
      }
   };
   return (
      <section className='w-full min-h-screen flex flex-col md:items-start justify-center lg:flex-row'>
         <div className='hidden lg:block w-1/2 h-screen'>
            <img
               className='w-full h-full object-cover pointer-events-none'
               src={forgotImage}
               alt='Forgot Password Illustration'
            />
         </div>

         <div className='w-full lg:w-1/2 h-full px-[5vw] pt-[10vh] flex flex-col items-start justify-center text-[#333]'>
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

               <h1 className='text-[clamp(1.2rem,2vw,2rem)] font-semibold mb-[clamp(1rem,2vw,1.5rem)]'>
                  Forgot your password?
               </h1>

               <p className='text-[clamp(0.85rem,1.5vw,1rem)] text-gray-600 mb-[clamp(1rem,2vw,1.5rem)]'>
                  Enter your email address and we will send you a
                  one-time password (OTP) to reset your password.
               </p>

               <input
                  type='email'
                  autoComplete='off'
                  {...register('email')}
                  placeholder='Email'
                  className='border border-[#A0A0A080]/50 placeholder:text-[#333] rounded-lg p-[clamp(0.6rem,1.2vw,1rem)] w-full text-[clamp(0.9rem,1.2vw,1rem)]'
               />
               {errors?.email?.message && (
                  <span className='text-red-400 text-sm'>
                     {errors?.email?.message}
                  </span>
               )}

               <div className='flex w-full items-center justify-center gap-6 my-[clamp(1rem,2vw,1.5rem)] flex-col md:flex-row'>
                  <button
                     disabled={loading}
                     type='submit'
                     className='bg-[#333] text-white font-medium rounded-lg p-[clamp(0.8rem,1.5vw,1.2rem)] w-full md:w-1/2 text-[clamp(1rem,1.3vw,1.2rem)] disabled:bg-gray-200'
                  >
                     {loading ? 'Loading...' : 'Reset Now'}
                  </button>
               </div>

               <p className='mt-4 text-[clamp(0.8rem,1vw,1rem)] font-semibold'>
                  Remember your password?{' '}
                  <Link to='/login' className='text-[#B83D00]'>
                     Login
                  </Link>
               </p>
            </form>
         </div>
      </section>
   );
};

export default ForgotPassword;
