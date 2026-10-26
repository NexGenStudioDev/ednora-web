import { useEffect } from 'react';
import { setAlbum } from '../store/homeSlice';
import { Album_EndPoint } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const useAlbum = () => {
   let Album = useSelector(state => state.home.Album);
   let dispatch = useDispatch();

   const Handle_Album = async () => {
      try {
         const response = await axios.get(Album_EndPoint);
         let data = response.data?.data;
         if (data && Array.isArray(data)) {
            dispatch(setAlbum(data));
         }
      } catch (error) {
         console.error('Error fetching album from backend API:', error.message);
      }
   };

   useEffect(() => {
      Handle_Album();
   }, []);
};

export default useAlbum;
