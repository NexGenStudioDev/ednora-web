import {
   useEffect,
   useState,
   useMemo,
   useCallback,
   memo,
} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGallery } from '../../../hooks/useGallery';
import useAlbum from '../../../hooks/useAlbum';
import GalleryCard from './GalleryCard';
import {
   MdCollections,
   MdPhotoLibrary,
   MdSearch,
   MdClose,
   MdNavigateBefore,
   MdNavigateNext,
   MdDownload,
   MdArrowForward,
   MdCalendarToday,
   MdFilterList,
} from 'react-icons/md';

const Gallery = () => {
   const gallery = useSelector(state => state.gallery) || [];
   const albums = useSelector(state => state.home.Album) || [];

   const [activeTab, setActiveTab] = useState('all'); // 'all' | 'albums'
   const [searchQuery, setSearchQuery] = useState('');
   const [activePhotoIndex, setActivePhotoIndex] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   useGallery();
   useAlbum();

   useEffect(() => {
      if (gallery.length > 0 || albums.length > 0) {
         setIsLoading(false);
      } else {
         const timer = setTimeout(() => setIsLoading(false), 1200);
         return () => clearTimeout(timer);
      }
   }, [gallery, albums]);

   // Filter photos based on search query
   const filteredImages = useMemo(() => {
      if (!searchQuery.trim()) return gallery;
      const q = searchQuery.toLowerCase();
      return gallery.filter(img => {
         const albumName = (
            img.albumName ||
            img.name ||
            ''
         ).toLowerCase();
         const url = (img.url || '').toLowerCase();
         return albumName.includes(q) || url.includes(q);
      });
   }, [gallery, searchQuery]);

   // Filter albums based on search query
   const filteredAlbums = useMemo(() => {
      if (!searchQuery.trim()) return albums;
      const q = searchQuery.toLowerCase();
      return albums.filter(alb => {
         const name = (alb.aName || '').toLowerCase();
         const desc = (alb.aDescription || '').toLowerCase();
         return name.includes(q) || desc.includes(q);
      });
   }, [albums, searchQuery]);

   // Handle Single Photo Download
   const handleDownloadPhoto = useCallback((url, index) => {
      try {
         const link = document.createElement('a');
         link.href = url;
         link.download = `Ednora-Gallery-Photo-${index + 1}.jpg`;
         link.target = '_blank';
         link.rel = 'noopener noreferrer';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } catch (err) {
         console.error('Download error:', err);
         window.open(url, '_blank');
      }
   }, []);

   // Keyboard controls for Lightbox
   useEffect(() => {
      const handleKeyDown = e => {
         if (activePhotoIndex === null) return;
         if (e.key === 'Escape') setActivePhotoIndex(null);
         if (e.key === 'ArrowLeft') {
            setActivePhotoIndex(prev =>
               prev > 0 ? prev - 1 : filteredImages.length - 1,
            );
         }
         if (e.key === 'ArrowRight') {
            setActivePhotoIndex(prev =>
               prev < filteredImages.length - 1 ? prev + 1 : 0,
            );
         }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () =>
         window.removeEventListener('keydown', handleKeyDown);
   }, [activePhotoIndex, filteredImages.length]);

   return (
      <div className='min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6 lg:px-12'>
         {/* Hero Header */}
         <div className='max-w-7xl mx-auto mb-10 text-center'>
            <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200'>
               <MdPhotoLibrary size={16} />
               <span>Ednora Campus Life & Moments</span>
            </div>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight'>
               Life at Ednora
            </h1>
            <p className='mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto'>
               Learning happens in many places, from classrooms and computer labs to collaborative projects and campus events. Explore moments that reflect student creativity, teamwork, academic activities, and the experiences that make campus life meaningful.
            </p>
         </div>

         {/* Navigation Tabs & Search Controls */}
         <div className='max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100'>
            {/* Tabs */}
            <div className='flex items-center p-1 bg-gray-100 rounded-xl w-full md:w-auto'>
               <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                     activeTab === 'all'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
               >
                  <MdCollections size={18} />
                  <span>All Photos ({gallery.length})</span>
               </button>
               <button
                  onClick={() => setActiveTab('albums')}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                     activeTab === 'albums'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
               >
                  <MdPhotoLibrary size={18} />
                  <span>Photo Albums ({albums.length})</span>
               </button>
            </div>

            {/* Search Input */}
            <div className='relative w-full md:w-80'>
               <div className='absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400'>
                  <MdSearch size={20} />
               </div>
               <input
                  type='text'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={
                     activeTab === 'all'
                        ? 'Search photos...'
                        : 'Search albums...'
                  }
                  className='w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition'
               />
               {searchQuery && (
                  <button
                     onClick={() => setSearchQuery('')}
                     className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                     aria-label='Clear search'
                  >
                     <MdClose size={16} />
                  </button>
               )}
            </div>
         </div>

         {/* Content Display */}
         <div className='max-w-7xl mx-auto'>
            {isLoading ? (
               /* Skeletons */
               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {[...Array(8)].map((_, i) => (
                     <div
                        key={i}
                        className='aspect-[4/3] rounded-2xl bg-gray-200 animate-pulse border border-gray-100'
                     />
                  ))}
               </div>
            ) : activeTab === 'albums' ? (
               /* Albums Grid */
               filteredAlbums.length === 0 ? (
                  <div className='bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 max-w-xl mx-auto my-12'>
                     <div className='w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4'>
                        <MdPhotoLibrary size={32} />
                     </div>
                     <h3 className='text-lg font-bold text-gray-900 mb-1'>
                        No Albums Found
                     </h3>
                     <p className='text-sm text-gray-500 mb-4'>
                        {searchQuery
                           ? `No albums match "${searchQuery}"`
                           : 'No institutional albums have been published yet.'}
                     </p>
                     {searchQuery && (
                        <button
                           onClick={() => setSearchQuery('')}
                           className='px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition'
                        >
                           Clear Search
                        </button>
                     )}
                  </div>
               ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                     {filteredAlbums.map((albumItem, idx) => (
                        <Link
                           key={albumItem._id || idx}
                           to={`/album/${albumItem.aName}`}
                           className='group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col'
                        >
                           <div className='relative aspect-[16/10] overflow-hidden bg-gray-100'>
                              <img
                                 src={
                                    albumItem.aImage_url ||
                                    'defaultBackgroundImage.jpg'
                                 }
                                 alt={albumItem.aName}
                                 loading='lazy'
                                 className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                              />
                              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity'></div>
                              <span className='absolute bottom-3 left-4 text-xs font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full'>
                                 Curated Album
                              </span>
                           </div>

                           <div className='p-5 flex-1 flex flex-col justify-between'>
                              <div>
                                 <h3 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition truncate'>
                                    {albumItem.aName}
                                 </h3>
                                 {albumItem.aDescription && (
                                    <p className='text-xs text-gray-500 mt-1 line-clamp-2'>
                                       {albumItem.aDescription}
                                    </p>
                                 )}
                              </div>

                              <div className='flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400'>
                                 <div className='flex items-center gap-1.5'>
                                    <MdCalendarToday size={14} />
                                    <span>
                                       {albumItem.createdAt
                                          ? new Date(
                                               albumItem.createdAt,
                                            ).toLocaleDateString(
                                               'en-IN',
                                               {
                                                  day: 'numeric',
                                                  month: 'short',
                                                  year: 'numeric',
                                               },
                                            )
                                          : 'Recent'}
                                    </span>
                                 </div>
                                 <div className='flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform'>
                                    <span>View Album</span>
                                    <MdArrowForward size={14} />
                                 </div>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               )
            ) : /* All Photos Grid */
            filteredImages.length === 0 ? (
               <div className='bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 max-w-xl mx-auto my-12'>
                  <div className='w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4'>
                     <MdFilterList size={32} />
                  </div>
                  <h3 className='text-lg font-bold text-gray-900 mb-1'>
                     No Photos Found
                  </h3>
                  <p className='text-sm text-gray-500 mb-4'>
                     {searchQuery
                        ? `No photos match "${searchQuery}"`
                        : 'No gallery photos are available at this moment.'}
                  </p>
                  {searchQuery && (
                     <button
                        onClick={() => setSearchQuery('')}
                        className='px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-medium hover:bg-blue-700 transition'
                     >
                        Clear Search
                     </button>
                  )}
               </div>
            ) : (
               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                  {filteredImages.map((img, index) => {
                     const url =
                        typeof img === 'string' ? img : img.url;
                     return (
                        <GalleryCard
                           key={img.id || img._id || url || index}
                           url={url}
                           index={index}
                           title={img.name || `CIITM Campus Life`}
                           album={img.albumName || ''}
                           onView={idx => setActivePhotoIndex(idx)}
                           onDownload={handleDownloadPhoto}
                        />
                     );
                  })}
               </div>
            )}
         </div>

         {/* Fullscreen Lightbox Modal */}
         {activePhotoIndex !== null &&
            filteredImages[activePhotoIndex] && (
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
                           CIITM Gallery Preview
                        </span>
                        <span className='text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white'>
                           {activePhotoIndex + 1} /{' '}
                           {filteredImages.length}
                        </span>
                     </div>

                     <div className='flex items-center gap-3'>
                        <button
                           onClick={() => {
                              const currentPhoto =
                                 filteredImages[activePhotoIndex];
                              const url =
                                 typeof currentPhoto === 'string'
                                    ? currentPhoto
                                    : currentPhoto?.url;
                              handleDownloadPhoto(
                                 url,
                                 activePhotoIndex,
                              );
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
                              prev > 0
                                 ? prev - 1
                                 : filteredImages.length - 1,
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
                           typeof filteredImages[activePhotoIndex] ===
                           'string'
                              ? filteredImages[activePhotoIndex]
                              : filteredImages[activePhotoIndex]?.url
                        }
                        alt={`Gallery full view ${activePhotoIndex + 1}`}
                        className='max-h-[82vh] max-w-[92vw] object-contain rounded-lg shadow-2xl transition-all duration-300'
                     />

                     {/* Next Button */}
                     <button
                        onClick={() =>
                           setActivePhotoIndex(prev =>
                              prev < filteredImages.length - 1
                                 ? prev + 1
                                 : 0,
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

export default memo(Gallery);
