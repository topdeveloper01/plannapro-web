import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Storage } from '../../services';
import { Header, Footer, Sidebar } from '../../components';
import AppRoutes from './appRoutes';
import { Config, ROUTES_NAMES } from '../../constants';
import { setI18nConfig } from '../../localisations';
import { loadUserSetting } from '../../services/user';
import { updateCartItems } from '../../store/actions/shop';
import {
  getLoggedInUser,
  legacyLogin,
  setAsLoggedIn,
  setAsSeenOnboard,
  updateProfileDetails
} from '../../store/actions/auth';
import {
  addDefaultAddress,
  getAddresses,
  setAddress,
  setAppLang,
  getFoodCategories
} from '../../store/actions/app';
import Geocode from 'react-geocode';

Geocode.setApiKey(Config.GOOGLE_MAP_API_KEY);

const App = (props) => {
  const location = useLocation();
  const authRoutes = [ROUTES_NAMES.login, ROUTES_NAMES.verification, ROUTES_NAMES.resetPass, ROUTES_NAMES.resetPassDone];
  const mapRoutes = [ ];
  const headerBorderRoutes = [ROUTES_NAMES.checkout];

  const [isAppLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    loadLoginInfo();
    props.getFoodCategories();
  }, []);

  const loadSettings = async () => {
    // seen onboard
    const seenOnboard = Storage.getSeenOnboard();
    if (seenOnboard === true) {
      await props.setAsSeenOnboard();
    }

    // cart
    const cartItems = Storage.getCartItems();
    props.updateCartItems(cartItems);

    // load app lang
    setI18nConfig();
    let lang = Storage.getLanguage();
    await props.setAppLang(lang);
  };

  const loadLoginInfo = async () => {
    let logged_user_data = null;
    try {
      let token = Storage.getAppToken();
      if (token) {
        console.log('app token ', token);
        if (!token.startsWith('Bearer')) {
          token = `Bearer ${token}`;
        }
        logged_user_data = await props.legacyLogin(token);
      }
      // eslint-disable-next-line no-empty
    } catch (e) {}

    try {
      await loadUserSetting(props, logged_user_data);
      // eslint-disable-next-line no-empty
    } catch (error) {}

    try {
      await loadSettings();
      // eslint-disable-next-line no-empty
    } catch (error) {}
    setAppLoaded(true);
  };

  console.log('isAppLoaded ', isAppLoaded);

  return (
    <>
      {!authRoutes.includes(location.pathname) && (
        <Header
          hasBorderBottom={headerBorderRoutes.includes(location.pathname)}
        />
      )}
      {!authRoutes.includes(location.pathname) && <Sidebar />}
      <AppRoutes />
      {!authRoutes.includes(location.pathname) && !mapRoutes.includes(location.pathname) && (
        <Footer />
      )}
    </>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  hasLocation: PropTypes.bool,
  seenOnboard: PropTypes.bool,
  hasVerifiedPhone: PropTypes.bool,
  legacyLogin: PropTypes.func,
  getLoggedInUser: PropTypes.func,
  updateCartItems: PropTypes.func,
  setAsSeenOnboard: PropTypes.func,
  setAppLang: PropTypes.func,
  getFoodCategories: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  isLoggedIn: app.isLoggedIn,
  hasLocation: app.hasLocation,
  seenOnboard: app.seenOnboard,
  hasVerifiedPhone: app.hasVerifiedPhone
});

export default connect(mapStateToProps, {
  updateCartItems,
  legacyLogin,
  getLoggedInUser,
  setAsSeenOnboard,
  updateProfileDetails,
  addDefaultAddress,
  getAddresses,
  setAddress,
  setAsLoggedIn,
  setAppLang,
  getFoodCategories
})(App);
