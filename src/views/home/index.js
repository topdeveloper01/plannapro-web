import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './index.css';
import Seo from '../../components/Seo';
import { setAppHeaderClass } from '../../store/actions/app';
import PropTypes from 'prop-types';
import { BookingInfo } from '../../components/Home';
import Svg_logo from '../../assets/images/app/Logo.svg';

const Home = (props) => {
  useEffect(() => {
    // props.setAppHeaderClass('app-home-header');
    return () => {
      props.setAppHeaderClass('');
    };
  }, []);

  return (
    <div data-testid="view-home" className={'view-home'}>
      <Seo title={'Planna Pro'}/>
      <div className={'align-col-middle main pt3 pb10'}>
        <div className={'align-col-middle logo-view'}>
          <img src={Svg_logo}/>
        </div>
        <div className={'calendar-container flex_wrap mt5'}>
          <div className={'info-view ph2 pv3'}>
            <BookingInfo/>
          </div>
          <div className={'align-col-middle calendar-view pl4 pr2 pv3'}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  setAppHeaderClass: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn
});

export default connect(mapStateToProps, {
  setAppHeaderClass
})(Home);
