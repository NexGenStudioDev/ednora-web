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
         if (!Album || Album.length === 0) {
            const response = await axios.get(Album_EndPoint);

            let data = response.data?.data;
            if (data && data.length > 0) {
               dispatch(setAlbum(data));
            }
         }
      } catch (error) {
         console.warn('Album API offline, using local configuration:', error.message);
      }
   };

   useEffect(() => {
      Handle_Album();
   }, []);
};

export default useAlbum;
