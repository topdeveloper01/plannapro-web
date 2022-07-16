import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.css';
import Seo from '../../components/Seo';
import { setAppHeaderClass } from '../../store/actions/app';
import PropTypes from 'prop-types';
import Svg_logo from '../../assets/images/app/Logo.svg';

const BookingDone = (props) => {
  useEffect(() => {
    // props.setAppHeaderClass('app-home-header');
    return () => {
      props.setAppHeaderClass('');
    };
  }, []);

  return (
    <div  className={'booking-done'}>
      <Seo title={'Planna Pro'}/>
      <div className={'align-col-middle main pt3 pb10'}>
        <div className={'align-col-middle'}>
          <img src={Svg_logo}/>
        </div>
        <div className={'content flex_wrap mt5'}>
          <div className={'info-view ph2 pv3'}>
          </div>
          <div className={'align-col-middle img-view pl4 pr2 pv3'}>
          </div>
        </div>
      </div>
    </div>
  );
};

BookingDone.propTypes = {
  isLoggedIn: PropTypes.bool,
  setAppHeaderClass: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn
});

export default connect(mapStateToProps, {
  setAppHeaderClass
})(BookingDone);
