import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@styled-icons/typicons';
import './index.css';
import { setAppHeaderClass } from '../../../store/actions/app';
import { Theme } from '../../../assets';
import { MainBtn, RoundIconBtn, OutlineBtn } from '../../../components/Buttons';
import { ROUTES_NAMES } from '../../../constants';
import PickedSlot from '../../../components/Home/PickedSlot';

const ConfirmBooking = (props) => {
  const navigate = useNavigate();

  const onContinue = () => {
    navigate(ROUTES_NAMES.home + ROUTES_NAMES.confirmBooking);
  };

  return (
    <div className={'align-col-middle confirm-booking-view'}>
      <div className={'row'}>
        <div className={'align-middle head-nav'}>
          <RoundIconBtn
            icon={<ArrowLeft size={18} color={Theme.colors.gray1}/>}
            onClick={() => navigate(-1)}
          />
          <h5>Confirm Appointment details</h5>
        </div>
      </div>
      <div className={'row mt4 ph1'}>
        <p className={'subject-title'}>Suggested Appointment Slot/s</p>
      </div>
      <div className={'row'}>
        {
          props.slots.map((slot, index) =>
            <PickedSlot
              key={index}
              slot={slot}
              onEdit={() => {

              }}
              onDelete={() => {

              }}
            />
          )
        }
      </div>
      <div className={'flex_1 row bottom mt4'}>
        <OutlineBtn
          className={'cancel-btn'}
          title={'Cancel'}
          onClick={() => navigate(-1)}
        />
        <div style={{ width: 10 }}/>
        <MainBtn
          className={'continue-btn'}
          title={'Send Booking Request'}
          onClick={onContinue}
        />
      </div>
    </div>
  );
};

ConfirmBooking.propTypes = {
  isLoggedIn: PropTypes.bool,
  slots: PropTypes.array,
  setAppHeaderClass: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn,
  slots: app.slots
});

export default connect(mapStateToProps, {
  setAppHeaderClass
})(ConfirmBooking);
