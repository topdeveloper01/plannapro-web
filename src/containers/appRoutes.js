import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES_NAMES } from '../constants';
import Home from '../views/home';
import Login from '../views/auth/index';
import PrivacyPolicy from '../views/privacy';
import TermsConditions from '../views/terms-conditions';
import NotFound from '../views/notFound';

const AppRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path={ROUTES_NAMES.home} element={<Home />} />
        <Route exact path={ROUTES_NAMES.login} element={<Login />} />
        <Route exact path={ROUTES_NAMES.privacy} element={<PrivacyPolicy />} />
        <Route exact path={ROUTES_NAMES.terms} element={<TermsConditions />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default AppRoutes;
