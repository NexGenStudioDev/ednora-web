import React from 'react';
import { Link } from 'react-router-dom';
import Google_Wrapper from './Google_Wrapper';
import Input from './Input';
import signupImage from '../../assets/images/signup.png';
import logo from '../../assets/images/logo.png';
import { EDNORA_LOGO_URL } from '../../config/frontend.config.js';
import Checkbox from './Checkbox';
import { Sign_Up_EndPoint } from '../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { setUser } from '../../store/AuthSlice';

const Signup = () => {
   let dispatch = useDispatch();
   let [isLoading, setIsLoading] = React.useState(false);

   let First_Name = useSelector(state =>
      state.auth.data.find(item => item.name === 'firstName'),
   );

   let Last_Name = useSelector(state =>
      state.auth.data.find(item => item.name === 'lastName'),
   );

   let email = useSelector(state =>
      state.auth.data.find(item => item.name === 'signupEmail'),
   );

   let password = useSelector(state =>
      state.auth.data.find(item => item.name === 'password'),
   );

   let confirm_Password = useSelector(state =>
      state.auth.data.find(item => item.name === 'confirm_Password'),
   );

   let Handle_Signup = async e => {
      e.preventDefault();

      if (
         !First_Name &&
         !Last_Name &&
         !email &&
         !password &&
         !confirm_Password
      ) {
         throw new Error('Please Enter all the fields');
      }

      try {
         let res = await axios.post(Sign_Up_EndPoint, {
            name: First_Name.value + ' ' + Last_Name.value,
            email: email.value,
            password: password.value,
            confirm_Password: confirm_Password.value,
         });

         Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.data.message,
         });

         dispatch(setUser(res.data.user));
      } catch (error) {
         let error_message = error.response.data.message;

         Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error_message
               ? error_message
               : 'Something went wrong',
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <section className='w-full min-h-screen flex max-[999px]:flex-col'>
         <div className='left w-1/2 max-[999px]:hidden h-full'>
            <img
               className='w-full h-full object-cover pointer-events-none'
               src={signupImage}
               alt='Signup Illustration'
            />
         </div>

         <div className='right w-1/2 max-[999px]:w-full h-full max-[999px]:px-6 max-[999px]:pt-[50vw] pt-32 px-16 flex flex-col items-start justify-center text-[#333]'>
            <form className='w-full h-full bg-[#FAFAFA] p-6'>
               <div className='logo mb-6'>
                  <img
                     src={logo || EDNORA_LOGO_URL}
                     alt='Ednora Logo'
                     className='h-8 w-auto object-contain'
                  />
               </div>

               <h1 className='heading text-[1.8vw] max-[999px]:text-[4.5vw] font-semibold mb-2'>
                  Start Your Journey with Ednora
               </h1>
               <p className='text-[0.9vw] max-[999px]:text-[2.5vw] mb-6 text-gray-600 leading-relaxed'>
                  Take the first step toward your academic goals. Create your account to begin the registration process, follow your application progress, and connect with the team for guidance on your next steps.
               </p>

               <div className='w-full flex items-center justify-between gap-7'>
                  <Input
                     type='text'
                     name='firstName'
                     placeholder='First Name'
                     id='firstName'
                  />
                  <Input
                     type='text'
                     name='lastName'
                     placeholder='Last Name'
                     id='lastName'
                  />
               </div>

               <Input
                  type='email'
                  name='signupEmail'
                  placeholder='Enter your Email'
                  id='email'
               />

               <Input
                  type='password'
                  name='password'
                  placeholder='Create Password'
                  id='createPassword'
               />

               <Input
                  type='password'
                  name='confirm_Password'
                  placeholder='Confirm Password'
                  id='confirmPassword'
               />

               <div className='flex items-center gap-2 '>
                  <Checkbox
                     label='Remember Me'
                     name='Sign_UP_CHECK'
                  />
               </div>

               <div className='flex w-full items-center justify-center gap-6 max-[999px]:gap-4 my-2 max-[999px]:flex-col'>
                  <button
                     onClick={e => Handle_Signup(e)}
                     className='bg-[#333] hover:bg-black transition text-white font-medium rounded-lg p-3.5 w-1/2 text-[1vw] max-[999px]:text-[3vw] max-[999px]:w-full'
                  >
                     Create Account
                  </button>
                  <button className='bg-[#333] text-white font-medium rounded-lg p-3.5 w-1/2 text-[1vw] max-[999px]:text-[3vw] max-[999px]:w-full'>
                     <Google_Wrapper text='Sign up with Google' />
                  </button>
               </div>

               <p className='mt-4 text-[0.85vw] max-[999px]:text-[2.5vw] font-semibold text-gray-600'>
                  Already have an account?{' '}
                  <Link to='/login' className='text-[#B83D00] hover:underline'>
                     Sign in.
                  </Link>
               </p>
            </form>
         </div>
      </section>
   );
};

export default Signup;
