import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAlbum from '../../../hooks/useAlbum';
import { Remove_One_Album } from '../../../store/homeSlice';
import AlbumPrimaryCard from '../../Molecules/Cards/Album/AlbumPrimaryCard';

const Album = () => {
   const [albums, setAlbums] = useState([]);
   const [error, setError] = useState(false);
   const [userRole, setUserRole] = useState('');
   const [isClick, setIsClick] = useState(false);

   const dispatch = useDispatch();
   const user = useSelector(state => state.auth.user);
   const album = useSelector(state => state.home.Album);

   useAlbum();

   useEffect(() => {
      if (album) {
         setAlbums([...album]);
      }
   }, [album]);

   useEffect(() => {
      if (user) {
         setUserRole(user.role);
      }
   }, [user]);

   const handleAlbumDelete = async (e, albumItem) => {
      try {
         e.stopPropagation();
         e.preventDefault();

         if (userRole === 'admin') {
            dispatch(Remove_One_Album({ _id: albumItem._id }));
            await axios.delete(
               `/api/v1/admin/delete/album/${albumItem._id}`,
            );
         } else {
            window.location.href = `/album/${albumItem.aName}`;
         }
      } catch (err) {
         console.error('Error:', err);
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err?.response?.data || 'Something went wrong!',
         });
      }
   };

   return (
      <div className='w-full h-auto md:h-screen px-[3vw] py-5 flex items-center justify-between flex-col md:flex-row'>
         <div className='md:w-[55vw] md:h-[62vh] w-full sm:h-full grid grid-rows-2 grid-cols-2 md:grid-cols-3 gap-[3vw] md:gap-[1.5vw] place-items-center'>
            {error ? (
               <h1 className='text-2xl text-center'>
                  No Data From Backend
               </h1>
            ) : albums.length === 0 ? (
               <h1 className='text-2xl text-center'>
                  Album Not Found
               </h1>
            ) : (
               albums.map(item => (
                  <AlbumPrimaryCard
                     key={item._id}
                     image={item.aImage_url}
                     title={item.aName}
                     date={item.createdAt}
                     isAdmin={userRole === 'admin'}
                     onClickViewUrl={`/album/${item.aName}`}
                     onClickDelete={e => handleAlbumDelete(e, item)}
                     containerClass='w-full h-full rounded-lg overflow-hidden relative m-[3vw]'
                     imageClass='h-full w-full object-cover object-top'
                     titleClass='text-[2vw] md:text-[1vw] text-white font-semibold'
                     dateClass='text-[2.3vw] md:text-[1vw] text-white'
                  />
               ))
            )}
         </div>

         {albums.length > 0 && (
            <div className='h-[63vh] w-full md:w-[35vw] mr-[1vw] md:mr-[2vw] rounded-lg relative'>
               <AlbumPrimaryCard
                  image={albums[albums.length - 1]?.aImage_url}
                  title={albums[albums.length - 1]?.aName}
                  date={albums[albums.length - 1]?.createdAt}
                  isAdmin={userRole === 'admin'}
                  onClickViewUrl={`/album/${albums[albums.length - 1]?.aName}`}
                  onClickDelete={e =>
                     handleAlbumDelete(e, albums[albums.length - 1])
                  }
                  containerClass='flex h-full w-full rounded-lg overflow-hidden relative'
                  imageClass='h-full w-full object-cover object-top'
                  titleClass='text-[2vw] md:text-[1vw] text-white font-semibold'
                  dateClass='text-[2.3vw] md:text-[1vw] text-white'
               />
            </div>
         )}
      </div>
   );
};

export default Album;
