import { useEffect, useState, memo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import useTestimonial from '../../../hooks/useTestimoniyal';
import TestimonialPrimaryCard from '../../Molecules/Cards/Testimonial/TestimonialPrimaryCard';

const Testimonials = () => {
   const testimonialData = useSelector(
      state => state.home.Testimonital,
   );

   const [testimonials, setTestimonials] = useState([]);

   useTestimonial();

   useEffect(() => {
      if (testimonialData) {
         let arr = Array.isArray(testimonialData)
            ? testimonialData
            : [testimonialData];
         if (arr.length === 1) {
            // Duplicate the single testimonial so slider works
            arr = [arr[0], arr[0]];
         }
         setTestimonials(arr);
      }
   }, [testimonialData]);

   const settings = {
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '16%',
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 1,
               centerPadding: '0%',
               centerMode: true,
            },
         },
      ],
   };

   return (
      <section className='w-full py-[10vh] max-[700px]:px-[5vw] px-[2vw] text-white bg-[#333] p-[2vw] flex max-[600px]:flex-col items-center overflow-hidden'>
         {/* Header */}
         <div className='left-text w-[33vw] mb-8 max-[600px]:w-full ml-[2.5vw]'>
            <span className='text-xs uppercase tracking-wider text-primary font-bold'>
               Testimonials
            </span>
            <h1 className='text-[3.1vw] max-[599px]:text-[8vw] font-semibold mt-1'>
               Experiences That Inspire Us
            </h1>
            <p className='text-[1vw] max-[599px]:text-[3.5vw] font-light mt-4 w-[85%] max-[599px]:w-full leading-relaxed'>
               Every learning journey is different. Student experiences can offer a valuable perspective on the teaching, resources, and opportunities that shape life at an institution.
            </p>
         </div>

         {/* Slider */}
         <div className='carousel-container w-[55vw] max-[600px]:w-full overflow-hidden'>
            {testimonials.length > 1 ? (
               <Slider {...settings} className='slider opacity-100'>
                  {testimonials.map((t, idx) => (
                     <div
                        key={t.id || idx}
                        className='relative w-full flex justify-center'
                     >
                        <TestimonialPrimaryCard {...t} />
                     </div>
                  ))}
               </Slider>
            ) : testimonials.length === 1 ? (
               <div className='relative w-full flex justify-center'>
                  <TestimonialPrimaryCard {...testimonials[0]} />
               </div>
            ) : (
               <div className='text-center'>
                  <h2>No Testimonials Found</h2>
               </div>
            )}
         </div>
      </section>
   );
};

export default memo(Testimonials);
