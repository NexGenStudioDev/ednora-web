import { useEffect, Suspense, lazy } from 'react';
import Body from './Body';
import {
   BrowserRouter,
   Route,
   Routes,
   useLocation,
} from 'react-router-dom';

import ErrorPage from './components/Templates/ErrorPage';
import Loader from './components/Molecules/Loader/Loader';

// Route-based code splitting
const Landing = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const ViewCourseDetail = lazy(() => import('./pages/ViewCourseDetail'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const Gallery = lazy(() => import('./components/Templates/gallery/Gallery'));
const Admission = lazy(() => import('./pages/Admission'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));
const Success = lazy(() => import('./pages/Success'));
const Testimonial = lazy(() => import('./pages/Testimonial'));
const Album_Image = lazy(
   () => import('./components/Templates/album/Album_Image'),
);
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const ForgotPassword = lazy(
   () => import('./components/Auth/ForgotPassword'),
);
const ResetPassword = lazy(
   () => import('./components/Auth/ResetPassword'),
);

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
         handleBeforeUnload();
         window.removeEventListener(
            'beforeunload',
            handleBeforeUnload,
         );
      };
   }, [location]);

   return null;
};

const App = () => {
   return (
      <BrowserRouter basename='/'>
         <ScrollRestoration />
         <Suspense fallback={<Loader />}>
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
         </Suspense>
      </BrowserRouter>
   );
};

export default App;
