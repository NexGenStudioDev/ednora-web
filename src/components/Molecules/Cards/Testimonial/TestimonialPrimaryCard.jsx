import React, { memo } from 'react';
import { MdStar } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { deleteTestimonial } from '../../../../store/Testimonials.slice';
import { toast } from 'react-toastify';

const renderStars = (count = 0) => {
   return [...Array(5)].map((_, i) => (
      <span key={i} className={`inline-block text-yellow-400`}>
         <MdStar />
      </span>
   ));
};

const TestimonialPrimaryCard = ({
   image,
   name,
   _id,
   job_Role,
   message,
   rating,
   containerClass = '',
   imageClass = '',
   nameClass = '',
   roleClass = '',
   messageClass = '',
   starClass = '',
}) => {
   let dispatch = useDispatch();
   const user = useSelector(state => state.auth.user);
   const { loading } = useSelector(state => state.testimonials);

   const handleTestimonialDelete = () => {
      if (
         window.confirm(
            'Are you sure you want to delete this testimonial?',
         )
      ) {
         dispatch(deleteTestimonial(_id))
            .unwrap()
            .then(() => {
               toast.success('Testimonial deleted successfully!'); // Optional: Show success toast
            })
            .catch(err => {
               toast.error(err || 'Failed to delete testimonial'); // Optional: Show error toast
            });
      }
   };

   return (
      <div
         className={`card cursor-grab w-[30vw] max-[599px]:w-full bg-white text-black rounded-xl px-6 py-8  shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between  h-full ${containerClass}`}
      >
         {user?.role === 'admin' && (
            <div className='w-full h-[5vh] flex items-center justify-end text-[2rem]'>
               <button
                  className='bg-black text-white rounded-full p-2 cursor-pointer'
                  onClick={handleTestimonialDelete}
                  disabled={loading}
                  aria-label='Delete testimonial'
               >
                  <MdDelete />
               </button>
            </div>
         )}

         <div className='profile flex items-center gap-4'>
            <div
               className={`image w-[3.5vw] max-[599px]:w-[12vw] h-[3.5vw] max-[599px]:h-[12vw] rounded-full overflow-hidden ${imageClass}`}
            >
               <img
                  src={image}
                  alt={name}
                  className='w-full h-full object-cover'
               />
            </div>
            <div className='txts'>
               <h1
                  className={`name text-[1.5vw] max-[599px]:text-[5vw] font-semibold ${nameClass}`}
               >
                  {name}
               </h1>
               <p
                  className={`position text-[1vw] max-[599px]:text-[3vw] ${roleClass}`}
               >
                  {job_Role}
               </p>
            </div>
         </div>

         <p
            className={`review mt-4 text-[1vw] max-[599px]:text-[2.5vw] ${messageClass}`}
            style={{
               overflow: 'hidden',
               textOverflow: 'ellipsis',
               display: '-webkit-box',
               WebkitLineClamp: 4,
               WebkitBoxOrient: 'vertical',
               minHeight: '4.5em',
               maxHeight: '6em',
            }}
            title={message}
         >
            {message}
         </p>

         <div
            className={`stars flex justify-between mt-4 ${starClass}`}
         >
            <span className='text-[1vw] max-[599px]:text-[3.5vw]'>
               {renderStars(rating)}
            </span>
         </div>
      </div>
   );
};

export default memo(TestimonialPrimaryCard);
