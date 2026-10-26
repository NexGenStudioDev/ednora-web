import axios from 'axios';
import React, {
   useEffect,
   useState,
   useMemo,
   useCallback,
   memo,
} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { set_Image } from '../../../store/ImageSlice';
import Album_Card from './Album_Card';
import {
   MdArrowBack,
   MdPhotoLibrary,
   MdDownload,
   MdClose,
   MdNavigateBefore,
   MdNavigateNext,
   MdOutlineCollections,
   MdRefresh,
} from 'react-icons/md';

const Album_Image = () => {
   const Image_Slice = useSelector(state => state.image.Image);
   const [images, setImages] = useState([]);
   const [loading, setLoading] = useState(true);
   const [activePhotoIndex, setActivePhotoIndex] = useState(null);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   // Handle both :AlbumName and :name param keys
   const rawAlbumName = params.AlbumName || params.name || '';
   const albumName = decodeURIComponent(rawAlbumName);
   const displayTitle = useMemo(() => {
      if (!albumName) return 'Institutional Album';
      return albumName
         .replace(/[-_]/g, ' ')
         .replace(/\b\w/g, char => char.toUpperCase());
   }, [albumName]);

   const fetchAlbumImages = useCallback(async () => {
      if (!rawAlbumName) return;
      setLoading(true);
      try {
         const findIndex = Image_Slice.findIndex(
            item => item.name === rawAlbumName,
         );
         if (findIndex !== -1) {
            setImages([...Image_Slice[findIndex].Images]);
         } else {
            const res = await axios.get(
               `/api/v1/user/get/Album/Image/${rawAlbumName}`,
            );
            const fetched = res.data?.data || [];
            const data = {
               name: rawAlbumName,
               Images: [...fetched],
            };
            dispatch(set_Image(data));
            setImages([...fetched]);
         }
      } catch (error) {
         console.error('Error fetching album images:', error);
         Swal.fire({
            icon: 'error',
            title: 'Album Not Loaded',
            text:
               error.response?.data?.message ||
               'Unable to load photos for this album. Please try again.',
         });
      } finally {
         setLoading(false);
      }
   }, [rawAlbumName, Image_Slice, dispatch]);

   useEffect(() => {
      fetchAlbumImages();
   }, [rawAlbumName]);

   // Handle Single Photo Download
   const handleDownloadPhoto = useCallback(
      (url, index) => {
         try {
            const link = document.createElement('a');
            link.href = url;
            link.download = `${albumName || 'CIITM-Album'}-Photo-${index + 1}.jpg`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
         } catch (err) {
            console.error('Download error:', err);
            window.open(url, '_blank');
         }
      },
      [albumName],
   );

   // Lightbox navigation keyboard shortcuts
   useEffect(() => {
      const handleKeyDown = e => {
         if (activePhotoIndex === null) return;
         if (e.key === 'Escape') setActivePhotoIndex(null);
         if (e.key === 'ArrowLeft') {
            setActivePhotoIndex(prev =>
               prev > 0 ? prev - 1 : images.length - 1,
            );
         }
         if (e.key === 'ArrowRight') {
            setActivePhotoIndex(prev =>
               prev < images.length - 1 ? prev + 1 : 0,
            );
         }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () =>
         window.removeEventListener('keydown', handleKeyDown);
   }, [activePhotoIndex, images.length]);

   return (
      <div className='min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-12'>
         {/* Top Header / Breadcrumb Section */}
         <div className='max-w-7xl mx-auto mb-8'>
            {/* Breadcrumb */}
            <nav
               className='flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-4'
               aria-label='Breadcrumb'
            >
               <Link
                  to='/'
                  className='hover:text-blue-600 transition'
               >
                  Home
               </Link>
               <span>/</span>
               <Link
                  to='/gallery'
                  className='hover:text-blue-600 transition'
               >
                  Gallery
               </Link>
               <span>/</span>
               <span className='text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none'>
                  {displayTitle}
               </span>
            </nav>

            {/* Action Bar */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
               <div className='flex items-center gap-4'>
                  <button
                     onClick={() => navigate('/gallery')}
                     className='w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition shadow-sm'
                     title='Back to Gallery'
                     aria-label='Back to Gallery'
                  >
                     <MdArrowBack size={20} />
                  </button>
                  <div>
                     <h1 className='text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight'>
                        {displayTitle}
                     </h1>
                     <p className='text-xs sm:text-sm text-gray-500 mt-0.5 flex items-center gap-1.5'>
                        <MdPhotoLibrary
                           className='text-blue-600'
                           size={16}
                        />
                        <span>
                           Central Institute of Information Technology
                           & Management
                        </span>
                     </p>
                  </div>
               </div>

               <div className='flex items-center gap-3'>
                  <div className='px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold flex items-center gap-1.5'>
                     <span className='w-2 h-2 rounded-full bg-blue-600 animate-pulse'></span>
                     <span>
                        {images.length}{' '}
                        {images.length === 1 ? 'Photo' : 'Photos'}
                     </span>
                  </div>
                  <button
                     onClick={fetchAlbumImages}
                     className='p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition text-xs font-medium flex items-center gap-1.5'
                     title='Refresh Photos'
                  >
                     <MdRefresh size={16} />
                     <span className='hidden sm:inline'>Refresh</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Content Area */}
         <div className='max-w-7xl mx-auto'>
            {loading ? (
               /* Skeleton Grid */
               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {[...Array(8)].map((_, i) => (
                     <div
                        key={i}
                        className='aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse border border-gray-100'
                     />
                  ))}
               </div>
            ) : images.length === 0 ? (
               /* Empty State */
               <div className='bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 max-w-xl mx-auto my-12'>
                  <div className='w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4'>
                     <MdOutlineCollections size={36} />
                  </div>
                  <h2 className='text-xl font-bold text-gray-900 mb-2'>
                     No Photos Found in this Album
                  </h2>
                  <p className='text-sm text-gray-500 mb-6'>
                     Photos for &ldquo;{displayTitle}&rdquo; have not
                     been uploaded yet or are being processed by
                     administration.
                  </p>
                  <div className='flex items-center justify-center gap-3'>
                     <Link
                        to='/gallery'
                        className='px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition shadow-sm'
                     >
                        Explore Other Albums
                     </Link>
                     <button
                        onClick={fetchAlbumImages}
                        className='px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition'
                     >
                        Try Again
                     </button>
                  </div>
               </div>
            ) : (
               /* Photo Gallery Grid */
               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {images.map((item, index) => {
                     const photoUrl =
                        typeof item === 'string' ? item : item?.url;
                     return (
                        <Album_Card
                           key={
                              item.id || item._id || photoUrl || index
                           }
                           url={photoUrl}
                           index={index}
                           title={`${displayTitle} - #${index + 1}`}
                           onView={idx => setActivePhotoIndex(idx)}
                           onDownload={handleDownloadPhoto}
                        />
                     );
                  })}
               </div>
            )}
         </div>

         {/* Fullscreen Lightbox Modal */}
         {activePhotoIndex !== null && images[activePhotoIndex] && (
            <div
               className='fixed inset-0 z-[120] bg-black/95 flex flex-col justify-between backdrop-blur-md p-4 animate-in fade-in duration-200 select-none'
               onClick={() => setActivePhotoIndex(null)}
            >
               {/* Lightbox Topbar */}
               <div
                  className='flex items-center justify-between text-white p-2 z-10'
                  onClick={e => e.stopPropagation()}
               >
                  <div className='flex items-center gap-3'>
                     <span className='text-sm font-semibold tracking-wide'>
                        {displayTitle}
                     </span>
                     <span className='text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white'>
                        {activePhotoIndex + 1} / {images.length}
                     </span>
                  </div>

                  <div className='flex items-center gap-3'>
                     <button
                        onClick={() => {
                           const currentPhoto =
                              images[activePhotoIndex];
                           const url =
                              typeof currentPhoto === 'string'
                                 ? currentPhoto
                                 : currentPhoto?.url;
                           handleDownloadPhoto(url, activePhotoIndex);
                        }}
                        className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition'
                        title='Download photo'
                     >
                        <MdDownload size={18} />
                        <span>Download</span>
                     </button>
                     <button
                        onClick={() => setActivePhotoIndex(null)}
                        className='p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition'
                        title='Close (Esc)'
                        aria-label='Close photo preview'
                     >
                        <MdClose size={24} />
                     </button>
                  </div>
               </div>

               {/* Lightbox Main Stage */}
               <div
                  className='relative flex-1 flex items-center justify-center overflow-hidden my-2'
                  onClick={e => e.stopPropagation()}
               >
                  {/* Previous Button */}
                  <button
                     onClick={() =>
                        setActivePhotoIndex(prev =>
                           prev > 0 ? prev - 1 : images.length - 1,
                        )
                     }
                     className='absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20'
                     aria-label='Previous photo'
                  >
                     <MdNavigateBefore size={32} />
                  </button>

                  {/* Active Photo */}
                  <img
                     src={
                        typeof images[activePhotoIndex] === 'string'
                           ? images[activePhotoIndex]
                           : images[activePhotoIndex]?.url
                     }
                     alt={`${displayTitle} full view ${activePhotoIndex + 1}`}
                     className='max-h-[82vh] max-w-[92vw] object-contain rounded-lg shadow-2xl transition-all duration-300'
                  />

                  {/* Next Button */}
                  <button
                     onClick={() =>
                        setActivePhotoIndex(prev =>
                           prev < images.length - 1 ? prev + 1 : 0,
                        )
                     }
                     className='absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition border border-white/20'
                     aria-label='Next photo'
                  >
                     <MdNavigateNext size={32} />
                  </button>
               </div>

               {/* Lightbox Bottom Info */}
               <div
                  className='text-center text-xs text-gray-400 py-1'
                  onClick={e => e.stopPropagation()}
               >
                  Use keyboard{' '}
                  <span className='text-gray-200 font-semibold'>
                     ←
                  </span>{' '}
                  and{' '}
                  <span className='text-gray-200 font-semibold'>
                     →
                  </span>{' '}
                  keys to navigate,{' '}
                  <span className='text-gray-200 font-semibold'>
                     Esc
                  </span>{' '}
                  to exit
               </div>
            </div>
         )}
      </div>
   );
};

export default memo(Album_Image);
