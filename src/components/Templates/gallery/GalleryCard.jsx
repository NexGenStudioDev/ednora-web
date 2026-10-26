import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MdZoomIn, MdDownload, MdImage } from 'react-icons/md';

const GalleryCard = ({
   url,
   index = 0,
   onView,
   onDownload,
   title = '',
   album = '',
}) => {
   const [imgLoaded, setImgLoaded] = useState(false);
   const [imgError, setImgError] = useState(false);

   return (
      <div
         onClick={() => onView && onView(index)}
         className='group relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl border border-gray-200/80 transition-all duration-300 cursor-pointer flex flex-col aspect-[4/3]'
      >
         {/* Skeleton loading before image loads */}
         {!imgLoaded && !imgError && (
            <div className='absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center text-gray-400'>
               <MdImage size={36} />
            </div>
         )}

         {/* Fallback if image fails */}
         {imgError ? (
            <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 p-4 text-center'>
               <MdImage size={40} className='mb-2 opacity-50' />
               <span className='text-xs font-medium'>
                  Image unavailable
               </span>
            </div>
         ) : (
            <img
               src={url}
               alt={title || `CIITM Campus Moment ${index + 1}`}
               loading='lazy'
               onLoad={() => setImgLoaded(true)}
               onError={() => setImgError(true)}
               className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
               }`}
            />
         )}

         {/* Gradient overlay on hover */}
         <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4'>
            <div className='flex justify-between items-start'>
               <span className='px-2.5 py-1 text-[11px] font-semibold bg-white/20 backdrop-blur-md text-white rounded-full'>
                  #{index + 1}
               </span>
               {onDownload && (
                  <button
                     type='button'
                     onClick={e => {
                        e.stopPropagation();
                        onDownload(url, index);
                     }}
                     title='Download photo'
                     aria-label='Download photo'
                     className='w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-gray-900 backdrop-blur-md flex items-center justify-center transition-colors'
                  >
                     <MdDownload size={16} />
                  </button>
               )}
            </div>

            <div className='flex items-center justify-between'>
               <div className='max-w-[70%]'>
                  {album && (
                     <p className='text-[10px] uppercase font-bold text-blue-300 tracking-wider truncate'>
                        {album}
                     </p>
                  )}
                  <span className='text-xs text-white/95 truncate font-medium block'>
                     {title || `Moment ${index + 1}`}
                  </span>
               </div>
               <div className='flex items-center gap-1 text-xs text-white bg-blue-600/90 hover:bg-blue-600 px-2.5 py-1 rounded-full backdrop-blur-sm transition-colors'>
                  <MdZoomIn size={14} />
                  <span>Preview</span>
               </div>
            </div>
         </div>
      </div>
   );
};

GalleryCard.propTypes = {
   url: PropTypes.string.isRequired,
   index: PropTypes.number,
   onView: PropTypes.func,
   onDownload: PropTypes.func,
   title: PropTypes.string,
   album: PropTypes.string,
};

export default React.memo(GalleryCard);
