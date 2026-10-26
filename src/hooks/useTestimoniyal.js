import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTestimonital } from '../store/homeSlice';
import axios from 'axios';
import { Testimonital_EndPoint } from '../utils/constants';

const useTestimonial = () => {
   let dispatch = useDispatch();

   const handleTestimonial = async () => {
      try {
         const response = await axios.get(Testimonital_EndPoint);
         const data = response.data?.data || response.data?.Find_Testimonial;
         if (data && Array.isArray(data)) {
            dispatch(setTestimonital(data));
         }
      } catch (error) {
         console.error('Error fetching testimonials from backend API:', error.message);
      }
   };

   useEffect(() => {
      handleTestimonial();
   }, []);
};

export default useTestimonial;
