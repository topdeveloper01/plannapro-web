import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './index.css';
import Seo from '../../components/Seo';
import { setAppHeaderClass } from '../../store/actions/app';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { QuestionCircleFill } from '@styled-icons/bootstrap';
import { BookingInfo, Timeslot, EventDatePicker } from '../../components/Home';
import Svg_logo from '../../assets/images/app/Logo.svg';
import { Theme } from '../../assets';
import { MainBtn } from '../../components/Buttons';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';

const Home = (props) => {
  const { t } = useTranslation();
  const tmpSlots = [
    '2022-07-14T09:00:37.808Z',
    '2022-07-14T09:15:37.808Z',
    '2022-07-14T09:30:37.808Z',
    '2022-07-14T09:45:37.808Z',
    '2022-07-14T10:00:37.808Z',
    '2022-07-14T10:15:37.808Z',
    '2022-07-14T10:30:37.808Z',
    '2022-07-14T09:00:37.808Z',
    '2022-07-14T09:15:37.808Z',
    '2022-07-14T09:30:37.808Z',
    '2022-07-14T09:45:37.808Z',
    '2022-07-14T10:00:37.808Z',
    '2022-07-14T10:15:37.808Z',
    '2022-07-14T10:30:37.808Z',
  ];
  const [curDate, setCurDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    // props.setAppHeaderClass('app-home-header');
    return () => {
      props.setAppHeaderClass('');
    };
  }, []);

  return (
    <div data-testid="view-home" className={'view-home'}>
      <Seo title={t('web_title.default')}/>
      <div className={'align-col-middle main pt3 pb10'}>
        <div className={'align-col-middle'}>
          <img src={Svg_logo}/>
        </div>
        <div className={'calendar-container flex_wrap mt5'}>
          <div className={'info-view ph2 pv3'}>
            <BookingInfo/>
          </div>
          <div className={'align-col-middle calendar-view pl4 pr2 pv3'}>
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
                                  label: t('Ok'),
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
                onClick={() => {
                }}
              />
            </div>
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
