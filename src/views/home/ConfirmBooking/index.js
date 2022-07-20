import React, {useState, useRef} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@styled-icons/typicons';
import './index.css';
import { setAppHeaderClass, setPickedSlots } from '../../../store/actions/app';
import { Theme } from '../../../assets';
import { MainBtn, RoundIconBtn, OutlineBtn } from '../../../components/Buttons';
import { ROUTES_NAMES } from '../../../constants';
import PickedSlot from '../../../components/Home/PickedSlot';
import ConfirmModal from '../../../components/Modals/ConfirmModal';

const ConfirmBooking = (props) => {
  const navigate = useNavigate();
  const [isConfirmModal, showConfirmModal] = useState(false);

  const _targetSlot = useRef(null);

  const onContinue = () => {
    navigate(ROUTES_NAMES.bookingDone);
  };

  const onDeleteSlot=(slot) => {
    console.log('delete slot ', slot)
    let clone = props.slots.slice(0);
    clone = clone.filter(s => s != slot);
    props.setPickedSlots(clone);
  }

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
              slot={{
                start: slot
              }}
              onEdit={() => {
                navigate(ROUTES_NAMES.home + ROUTES_NAMES.editSlot + `?slot=${slot}`);
              }}
              onDelete={() => {
                _targetSlot.current = slot;
                showConfirmModal(true);
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
      <ConfirmModal
        showModal={isConfirmModal}
        title={'Delete Slot'}
        message={'Are you sure you want to delete this slot?'}
        onClose={()=> showConfirmModal(false)}
        onYes={() => {
          showConfirmModal(false);
          onDeleteSlot(_targetSlot.current);
        }}
      />
    </div>
  );
};

ConfirmBooking.propTypes = {
  isLoggedIn: PropTypes.bool,
  slots: PropTypes.array,
  setAppHeaderClass: PropTypes.func,
  setPickedSlots : PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn,
  slots: app.slots
});

export default connect(mapStateToProps, {
  setAppHeaderClass, setPickedSlots
})(ConfirmBooking);
