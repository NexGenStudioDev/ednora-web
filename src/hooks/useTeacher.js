import { useDispatch } from 'react-redux';
import { setTeacher } from '../store/AboutSlice';
import { Find_Teacher_EndPoint } from '../utils/constants';
import { useEffect } from 'react';
import axios from 'axios';

const useTeacher = () => {
   let dispatch = useDispatch();

   let Handle_Teacher = async () => {
      try {
         let response = await axios.get(Find_Teacher_EndPoint);
         let data = response.data?.data;
         if (data && Array.isArray(data)) {
            dispatch(setTeacher(data));
         }
      } catch (error) {
         console.error(
            'Error fetching teachers from backend API:',
            error.message,
         );
      }
   };

   useEffect(() => {
      Handle_Teacher();
   }, []);
};

export default useTeacher;
