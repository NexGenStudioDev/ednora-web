import { useEffect } from 'react';
import Body from './Body';
import {
   BrowserRouter,
   Route,
   Routes,
   useLocation,
} from 'react-router-dom';

import ErrorPage from './components/Templates/ErrorPage';
import About from './pages/About';
import Landing from './pages/Home';

import Album_Image from './components/Templates/album/Album_Image';
import ContactUs from './pages/ContactUs';
import Admission from './pages/Admission';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import PaymentPage from './pages/PaymentPage';
import Gallery from './components/Templates/gallery/Gallery';

import Loader from './components/Molecules/Loader/Loader';
import ViewCourseDetail from './pages/ViewCourseDetail';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import StatusPage from './pages/StatusPage';
import Testimonial from './pages/Testimonial';
import Success from './pages/Success';


// ✅ Scroll Position Handler
const ScrollRestoration = () => {
   const location = useLocation();

   useEffect(() => {
      const savedPosition = sessionStorage.getItem(
         `scroll-${location.pathname}`,
      );
      if (savedPosition) {
         window.scrollTo(0, parseInt(savedPosition, 10));
      }

      const handleBeforeUnload = () => {
         sessionStorage.setItem(
            `scroll-${location.pathname}`,
            window.scrollY,
         );
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
         handleBeforeUnload(); // Save scroll before leaving
         window.removeEventListener(
            'beforeunload',
            handleBeforeUnload,
         );
      };
   }, [location]);

   return null;
};

const App = () => {
   useEffect(() => {
      window.onload = () => {
         return <Loader />;
      };
   }, []);

   return (
      <>
         <BrowserRouter basename='/'>
            <ScrollRestoration />
            <Routes>
               <Route path='*' element={<ErrorPage />} />
               <Route path='/' element={<Body />}>
                  <Route path='/' element={<Landing />} />

                  <Route path='/about' element={<About />} />
                  <Route
                     path='/course/:id'
                     element={<ViewCourseDetail />}
                  />
                  <Route path='/contact' element={<ContactUs />} />
                  <Route path='/gallery' element={<Gallery />} />
                  <Route path='/admission' element={<Admission />} />
                  <Route path='/payment' element={<PaymentPage />} />
                  <Route path='/status' element={<StatusPage />} />
                  <Route path='/Success' element={<Success />} />
                  <Route
                     path='/testimonial'
                     element={<Testimonial />}
                  />
                  <Route
                     path='/album/:AlbumName'
                     element={<Album_Image />}
                  />
                  <Route
                     path='/album/:name'
                     element={<Album_Image />}
                  />
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route
                     path='/forgot-password'
                     element={<ForgotPassword />}
                  />
                  <Route
                     path='/reset-password'
                     element={<ResetPassword />}
                  />
               </Route>

            
      
            </Routes>
         </BrowserRouter>
      </>
   );
};

export default App;
