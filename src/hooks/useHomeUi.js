import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLandingPage } from '../store/homeSlice';
import frontendConfig from '../config/frontend.config.js';

/**
 * useHomeUi
 * Loads landing page content (hero section image/text, about section, mission and goals)
 * directly from local frontend configuration without socket/backend dependency.
 */
const useHomeUi = () => {
   const dispatch = useDispatch();
   const landingPage = useSelector(state => state.home.landingPage);

   useEffect(() => {
      if (!landingPage) {
         dispatch(setLandingPage(frontendConfig.landingPage));
      }
   }, [landingPage, dispatch]);
};

export default useHomeUi;
