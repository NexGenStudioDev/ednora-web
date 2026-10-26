import React, { useState } from 'react';
import { Login_EndPoint } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import Google_Wrapper from './Google_Wrapper';
import Input from './Input';
import loginImage from '../../assets/images/login.png';
import logo from '../../assets/images/logo.png';
import { EDNORA_LOGO_URL } from '../../config/frontend.config.js';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Checkbox from './Checkbox';
import axios from 'axios';
import { setUser } from '../../store/AuthSlice';
import Loader from '../Molecules/Loader/Loader';

const Login = () => {
   let dispatch = useDispatch();
   let navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   let find_Email = useSelector(state =>
      state.auth.data.find(item => item.name === 'email'),
   );
   let find_Password = useSelector(state =>
      state.auth.data.find(item => item.name === 'password'),
   );

   let Handle_Login = async e => {
      try {
         e.preventDefault();
         setLoading(true);

         if (!find_Email && !find_Password) {
            throw new Error('Please Enter Email and Password');
         }

         if (!find_Email || !find_Password) {
            throw new Error('Email or Password not found in state');
         }
         let res = await axios.post(
            Login_EndPoint,
            {
               email: find_Email.value,
               password: find_Password.value,
            },
            {
               headers: {
                  'Content-Type': 'application/json',
               },
            },
         );

         let user = res.data.data.user;
         console.log('User Data:', user);

         localStorage.setItem('token', user.token);

         if (!user) {
            throw new Error('User not found');
         }

         dispatch(setUser(user));

         Swal.fire({
            icon: 'success',
            title: 'Logged in successfully',
            text: 'All administrative and student portal features are accessible via the Ednora Desktop App.',
            timer: 2000,
            showConfirmButton: false,
         });
         navigate('/');
      } catch (error) {
         Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
               error?.response?.data?.message ||
               error.message ||
               'Something went wrong',
         });
      } finally {
         setLoading(false);
      }
   };

   return (
      <section className='w-full min-h-screen flex items-center justify-center text-[#333] max-[999px]:flex-col'>
         <div className='left w-1/2 max-[999px]:w-full h-full max-[999px]:px-6 px-16 flex flex-col items-center justify-center'>
            <form className='w-full h-full bg-[#FAFAFA]  p-6'>
               {loading && (
                  <div className='absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50'>
                     <Loader />
                  </div>
               )}

               <div className='logo mb-6'>
                  <img
                     src={logo || EDNORA_LOGO_URL}
                     alt='Ednora Logo'
                     className='h-8 w-auto object-contain'
                  />
               </div>
               <div className='text mb-4'>
                  <h1 className='text-[1.4vw] max-[999px]:text-[4.5vw] font-semibold font-[Poppins]'>
                     Welcome Back
                  </h1>
                  <p className='text-[1vw] max-[999px]:text-[3vw] text-gray-600'>
                     Access your Ednora student and administrative
                     portal to manage coursework, fee payments, and
                     academic records.
                  </p>
               </div>

               <Input
                  type='email'
                  name='email'
                  id='email'
                  label='Email'
               />

               <Input
                  type='password'
                  id='password'
                  name='password'
                  label='Password'
               />

               <div className='w-full flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                     <Checkbox
                        label='View Password'
                        name='Login_CheckBox'
                     />
                  </div>
                  <Link
                     to='/forgot-password'
                     className='text-[#FF6603] text-[1.05vw] font-semibold max-[999px]:text-[3.05vw]'
                  >
                     Forgot Password?
                  </Link>
               </div>

               <button
                  onClick={e => Handle_Login(e)}
                  className='bg-[#333] text-white rounded-lg p-3.5 w-full text-[1.05vw] max-[999px]:text-[3.05vw] font-semibold mb-4'
                  disabled={loading}
               >
                  {loading ? 'Logging in...' : 'Log In'}
               </button>

               <button className='bg-white border border-gray-300 rounded-lg p-2 w-full text-[1.05vw] max-[999px]:text-[3.05vw]'>
                  <Google_Wrapper text='Sign In With Google' />
               </button>

               {/* <div className='w-full flex items-center justify-end'>
                  <p className='text-[1.05vw] font-semibold mt-4 max-[999px]:text-[3.05vw]'>
                     Registered?{' '}
                     <Link to='/signup' className='text-[#FF6603]'>
                        Create an Account
                     </Link>
                  </p>
               </div> */}
            </form>
         </div>

         <div className='right w-1/2 h-screen max-[999px]:hidden'>
            <img
               className='w-full h-full object-right object-cover pointer-events-none'
               src={loginImage}
               alt='Login Illustration'
            />
         </div>
      </section>
   );
};

export default Login;
