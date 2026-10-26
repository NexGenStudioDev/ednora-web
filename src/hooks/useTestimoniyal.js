import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTestimonital } from '../store/homeSlice';
import axios from 'axios';
import { Testimonital_EndPoint } from '../utils/constants';

const useTestimonial = () => {
   let Testimonital = useSelector(state => state.home.Testimonital);

   let dispatch = useDispatch();
   const handleTestimonial = async () => {
      try {
         if (!Testimonital || Testimonital.length === 0) {
            const response = await axios.get(Testimonital_EndPoint);
            if (response.data?.data && response.data.data.length > 0) {
               dispatch(setTestimonital(response.data.data));
            }
         }
      } catch (error) {
         console.warn('Testimonial API offline, using local configuration:', error.message);
      }
   };

   useEffect(() => {
      handleTestimonial();
   }, []);
};

export default useTestimonial;
