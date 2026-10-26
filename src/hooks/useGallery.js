import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { set_Gallery } from '../store/GallerySlice';

export const useGallery = () => {
   const dispatch = useDispatch();

   const fetchData = async () => {
      try {
         let res = await axios.get('/api/v1/user/get/All/Image');
         let data = res.data?.data;
         if (data && Array.isArray(data)) {
            dispatch(set_Gallery([...data]));
         }
      } catch (error) {
         console.error('Error fetching gallery images from backend API:', error.message);
      }
   };

   useEffect(() => {
      fetchData();
   }, []);
};
