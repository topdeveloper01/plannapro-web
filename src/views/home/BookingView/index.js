import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { QuestionCircleFill } from '@styled-icons/bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import './index.css';
import { setPickedSlots } from '../../../store/actions/app';
import { Timeslot, EventDatePicker } from '../../../components/Home';
import { Theme } from '../../../assets';
import { MainBtn } from '../../../components/Buttons';
import { ROUTES_NAMES } from '../../../constants';

const BookingView = (props) => {
  const navigate = useNavigate();
  const tmpSlots = [
    '2022-07-14T09:00:37.808Z',
    '2022-07-14T09:15:37.808Z',
    '2022-07-14T09:30:37.808Z',
    '2022-07-14T09:45:37.808Z',
    '2022-07-14T10:00:37.808Z',
    '2022-07-14T10:15:37.808Z',
    '2022-07-14T10:30:37.808Z',
    '2022-07-14T10:45:37.808Z',
    '2022-07-14T11:00:37.808Z',
    '2022-07-14T11:15:37.808Z',
    '2022-07-14T11:30:37.808Z',
    '2022-07-14T11:45:37.808Z',
    '2022-07-14T12:00:37.808Z',
    '2022-07-14T12:15:37.808Z'
  ];
  const [curDate, setCurDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);

  const onContinue = () => {
    props.setPickedSlots(selectedSlots);
    navigate(ROUTES_NAMES.home + ROUTES_NAMES.addPaymentInfo);
  };

  return (
    <div className={'align-col-middle booking-view'}>
      <h5><span>Select up to 5 Time Slots </span><QuestionCircleFill size={20} color={Theme.colors.gray1}/></h5>
      <div className={'row pv3'}>
        <div className={'date-picker-view pr4'}>
          <EventDatePicker
            onSelectDate={(date) => {
              setCurDate(date);
            }}
          />
        </div>
        <div className={'align-col-middle timeslots'}>
          <p className={'date'}>{moment(curDate).format('MMM DD, YYYY')}</p>
          <div className={'list ph2'}>
            {tmpSlots.map((slot, index) =>
              <Timeslot
                key={index}
                slot={slot}
                isSelected={selectedSlots.findIndex(s => s == slot) != -1}
                onSelect={(slot) => {
                  let tmp = selectedSlots.slice(0);
                  let index = tmp.findIndex(s => s == slot);
                  if (index != -1) {
                    tmp.splice(index, 1);
                    setSelectedSlots(tmp);
                  } else {
                    if (selectedSlots.length < 5) {
                      // slot.daysofweek = '' + curDate.getDay();
                      tmp.push(slot);
                      setSelectedSlots(tmp);
                    } else {
                      return confirmAlert({
                        title: null,
                        message: 'You can select up to 5 slots!',
                        closeOnEscape: true,
                        closeOnClickOutside: true,
                        buttons: [
                          {
                            label: 'OK',
                            className: 'error-ok-btn',
                            onClick: () => {
                            }
                          }
                        ]
                      });
                    }
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className={'flex_1 row bottom'}>
        <MainBtn
          isDisabled={selectedSlots.length == 0}
          className={'continue-btn'}
          title={'Continue'}
          onClick={onContinue}
        />
      </div>
    </div>
  );
};

BookingView.propTypes = {
  isLoggedIn: PropTypes.bool,
  setPickedSlots: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn
});

export default connect(mapStateToProps, {
  setPickedSlots
})(BookingView);
