import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES_NAMES } from '../../constants';
import Home from '../../views/home';
import Login from '../../views/auth/login';
import About from '../../views/about';
import DownloadApp from '../../views/download';
import PrivacyPolicy from '../../views/privacyPolicy';
import TermsConditions from '../../views/terms-conditions';
import NotFound from '../../views/notFound';

const AppRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path={ROUTES_NAMES.home} element={<Home />} />
        <Route exact path={ROUTES_NAMES.login} element={<Login />} />
        <Route exact path={ROUTES_NAMES.about} element={<About />} />
        <Route exact path={ROUTES_NAMES.downloadApp} element={<DownloadApp />} />
        <Route exact path={ROUTES_NAMES.privacyPolicy.index} element={<PrivacyPolicy />} />
        <Route exact path={ROUTES_NAMES.terms_conditions} element={<TermsConditions />} />
        <Route exact path={ROUTES_NAMES.settings} element={<Settings />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default AppRoutes;
