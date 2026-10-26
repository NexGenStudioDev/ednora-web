import Navbar from './components/Organisms/NavBar/User/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/Organisms/Footer/Footer.jsx';

const Body = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <Footer />
      </>
   );
};

export default Body;
