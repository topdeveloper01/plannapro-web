import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import querystring from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import './index.css';
import { setPickedSlots } from '../../../store/actions/app';
import { Timeslot, EventDatePicker } from '../../../components/Home';
import { MainBtn, OutlineBtn } from '../../../components/Buttons';
import { ROUTES_NAMES } from '../../../constants';

const BookingView = (props) => {
  const isEditSlot = props.isEditSlot || false;
  const navigate = useNavigate();
  const location = useLocation();
  const parsed = querystring.parse(location.search) || {};
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

  useEffect(() => {
    if (isEditSlot && parsed.slot) {
      let slot = moment(parsed.slot).toDate();
      setCurDate(slot);
      setSelectedSlots([parsed.slot]);
    }
  }, [parsed.slot]);

  const onContinue = () => {
    if (selectedSlots.length == 0) {
      return confirmAlert({
        title: null,
        message: 'You need to select at least a slot!',
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

    if (isEditSlot) {
      let tmp = props.slots.slice(0);
      let index = tmp.findIndex(s => s == parsed.slot);
      if (index != -1) {
        tmp[index] = selectedSlots[0];
      }
      props.setPickedSlots(tmp);
      // navigate(ROUTES_NAMES.home + ROUTES_NAMES.confirmBooking);
      navigate(-1);
    } else {
      props.setPickedSlots(selectedSlots);
      navigate(ROUTES_NAMES.home + ROUTES_NAMES.addPaymentInfo);
    }
  };

  console.log('booking view ', selectedSlots)
  return (
    <div className={'align-col-middle booking-view'}>
      <div className={'row pb3'}>
        <div className={'date-picker-view pr4'}>
          <EventDatePicker
            isEditSlot={isEditSlot}
            initDate={curDate}
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
                  if (isEditSlot) {
                    let tmp = [];
                    tmp.push(slot);
                    setSelectedSlots(tmp);
                  } else {
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
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
      {
        isEditSlot ?
          <div className={'flex_1 row bottom'}>
            <OutlineBtn
              className={'cancel-btn'}
              title={'Cancel'}
              onClick={() => {
                navigate(-1)
                // navigate(ROUTES_NAMES.home + ROUTES_NAMES.confirmBooking)
              }}
            />
            <div style={{ width: 10 }}/>
            <MainBtn
              className={'save-btn'}
              title={'Save'}
              onClick={onContinue}
            />
          </div>
          :
          <div className={'flex_1 row bottom'}>
            <MainBtn
              isDisabled={selectedSlots.length == 0}
              className={'continue-btn'}
              title={'Continue'}
              onClick={onContinue}
            />
          </div>
      }
    </div>
  );
};

BookingView.propTypes = {
  isEditSlot: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  slots: PropTypes.array,
  setPickedSlots: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn,
  slots: app.slots
});

export default connect(mapStateToProps, {
  setPickedSlots
})(BookingView);
