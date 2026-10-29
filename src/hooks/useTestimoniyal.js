import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTestimonital } from '../store/homeSlice';
import axios from 'axios';
import { Testimonital_EndPoint } from '../utils/constants';
import frontendConfig from '../config/frontend.config.js';

const useTestimonial = () => {
   const dispatch = useDispatch();
   const existing = useSelector(state => state.home.Testimonital);

   const handleTestimonial = async () => {
      // Seed default testimonials if Redux store is currently empty
      if (!existing || existing.length === 0) {
         if (frontendConfig.testimonials?.list) {
            dispatch(setTestimonital(frontendConfig.testimonials.list));
         }
      }

      try {
         const response = await axios.get(Testimonital_EndPoint);
         const data =
            response.data?.data || response.data?.Find_Testimonial;
         if (data && Array.isArray(data) && data.length > 0) {
            dispatch(setTestimonital(data));
         }
      } catch (error) {
         // Gracefully fallback to frontendConfig when remote backend endpoint is 404 / offline
         if (!existing || existing.length === 0) {
            if (frontendConfig.testimonials?.list) {
               dispatch(setTestimonital(frontendConfig.testimonials.list));
            }
         }
         console.warn(
            'Notice: Backend testimonials API unavailable, using default testimonials:',
            error.message,
         );
      }
   };

   useEffect(() => {
      handleTestimonial();
   }, []);
};

export default useTestimonial;
