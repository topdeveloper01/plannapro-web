import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES_NAMES } from '../../constants';
import { MainBtn } from '../Buttons';
import LangBtn from '../DropdownSelectors/Lang';
import Logo from '../Logo';
import './index.css';
import { Menu2Outline } from '@styled-icons/evaicons-outline';
import { Theme } from '../../assets';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSideBar } from '../../store/actions/app';
import { getImageFullURL } from '../../utils/common';

const Header = ({ headerClass, toggleSideBar, user, isLoggedIn, hasBorderBottom = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const getLogoType = () => {
    if (location && location.pathname) {
      if (location.pathname.includes('/blog') || location.pathname.includes('/categories') || location.pathname.includes('/vendors')) {
        return 'black';
      }
    }
    return '';
  };

  return (
    <div
      className={
        'header ' +
        (hasBorderBottom ? 'header-bottom-border' : '') +
        ' ' + headerClass
      }>
      <div className={'align-row-start left-side'}>
        <Button
          className={'drawerBtn'}
          onClick={(e) => {
            e.preventDefault();
            toggleSideBar();
          }}>
          <Menu2Outline color={Theme.colors.text} size={28} />
        </Button>
        <div className={'header-logo'}>
          <Logo type={getLogoType()} />
          {location.pathname === ROUTES_NAMES.becomePartner && (
            <div className={'vendor'}>{t('header.vendors')}</div>
          )}
        </div>
      </div>

      <div className={'right-side'}>
        {isLoggedIn ? (
          <div className={'align-row-start hide-sm'}>
            <div className={'align-row-start user-info'}>
              <img src={getImageFullURL(user.photo)} />
              <h2 className={'pl-10'}>{user.full_name}</h2>
            </div>
            {/*<Link to={ROUTES_NAMES.checkout} className={'cart-btn'} >*/}
            {/*  <img src={Svg_cart} />*/}
            {/*</Link>*/}
            <div className={'divider'} />
          </div>
        ) : (
          <MainBtn
            className={'hide-sm login-button'}
            title={t('header.login')}
            onClick={() => {
              navigate(ROUTES_NAMES.login);
            }}
          />
        )}
        <div className='lang-container'>
          <LangBtn height={isLoggedIn ? 46 : null} />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  headerClass: PropTypes.string,
  user: PropTypes.shape({
    full_name: PropTypes.string,
    photo: PropTypes.string
  }),
  isLoggedIn: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  hasBorderBottom: PropTypes.bool
};

function mapStateToProps({ app }) {
  return {
    user: app.user,
    isLoggedIn: app.isLoggedIn,
    hasVerifiedPhone: app.hasVerifiedPhone,
    isSidebarOpened: app.isSidebarOpened,
    headerClass: app.headerClass
  };
}

export default connect(mapStateToProps, {
  toggleSideBar
})(Header);
