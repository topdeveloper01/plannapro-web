import React, { useEffect, useState, useRef } from 'react';
import { Dialog } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MainBtn } from '../Buttons';
import './index.css';
import { TextSelector } from '../DropdownSelectors';
import Svg_close from '../../assets/svgs/modals/close.svg';
import { connect } from 'react-redux';
import { setDeliveryInfoCart } from '../../store/actions/shop';

const PickupTimeModal = (props) => {
  const { isOpen, availPickupDays } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const curDate = useRef(null);
  const curTime = useRef(null);
  const curTimeArr = useRef([]);

  const [DATES, setDates] = useState([]);
  const [TIMES, setTimes] = useState([]);

  const [date, setDate] = useState(DATES[0]);
  const [time, setTime] = useState(TIMES[0]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    loadDates();
  }, [availPickupDays, props.pickup_date, props.pickup_time]);

  const loadDates = () => {
    let tmp = [];
    availPickupDays.forEach((value) => {
      tmp.push(`${t(value.day)}. ${moment(value.date, 'YYYY-MM-DD').format('DD MMM, YYYY')}`);
    });
    setDates(tmp);
    if (tmp.length > 0) {
      let foundIndex = availPickupDays.findIndex((d) => d.date == props.pickup_date);
      if (foundIndex != -1) {
        setDate(tmp[foundIndex]);
        onSelectDate(foundIndex);
      } else {
        setDate(tmp[0]);
        onSelectDate(0);
      }
    }
  };

  const onSelectDate = (index) => {
    if (index < availPickupDays.length) {
      curDate.current = availPickupDays[index].date;
      curTimeArr.current = availPickupDays[index].times || [];

      let tmp = [];
      for (let i = 0; i < curTimeArr.current.length; i++) {
        if (i + 1 < curTimeArr.current.length) {
          tmp.push(`${curTimeArr.current[i]} - ${curTimeArr.current[i + 1]}`);
        }
      }
      setTimes(tmp);
      if (tmp.length > 0) {
        let foundIndex = curTimeArr.current.findIndex((d) => d == props.pickup_time);
        if (foundIndex != -1 && curDate.current == props.pickup_date) {
          setTime(tmp[foundIndex]);
          onSelectTime(foundIndex);
        } else {
          setTime(tmp[0]);
          onSelectTime(0);
        }
      }
    }
  };

  const onSelectTime = (index) => {
    if (index < curTimeArr.current.length) {
      curTime.current = curTimeArr.current[index];
    }
  };

  const onClose = () => {
    navigate(-1);
  };

  const onSave = () => {
    console.log(curDate.current, curTime.current);
    props.setDeliveryInfoCart({
      pickup_date: curDate.current,
      pickup_time: curTime.current
    });
    navigate(-1);
  };

  return (
    <Dialog open={open} className={'align-col-middle w100 modal pickup-time-modal'}>
      <div className={'align-col-middle content'}>
        <div className={'w100  pos_relative'}>
          <img src={Svg_close} className={'close-btn'} onClick={onClose} />
          <h1 className={'title'}>{t('modals.pickup_time')}</h1>
        </div>
        <div className={'w100 mt3 date-input'}>
          <TextSelector
            values={DATES}
            value={date}
            handleChange={(text, index) => {
              setDate(text);
              onSelectDate(index);
            }}
          />
        </div>
        <div className={'w100 mt2 time-input'}>
          <TextSelector
            values={TIMES}
            value={time}
            handleChange={(text, index) => {
              setTime(text);
              onSelectTime(index);
            }}
          />
        </div>
        <div
          className={'flex_1 align-col-middle w100 actions'}
          style={{ marginTop: 60, marginBottom: 40 }}>
          <MainBtn title={t('save')} onClick={onSave} className={'save-btn'} />
        </div>
      </div>
    </Dialog>
  );
};

const mapStateToProps = ({ app, shop }) => ({
  user: app.user,
  pickup_date: shop.delivery_info.pickup_date,
  pickup_time: shop.delivery_info.pickup_time
});

PickupTimeModal.propTypes = {
  isOpen: PropTypes.bool,
  pickup_date: PropTypes.string,
  pickup_time: PropTypes.string,
  availPickupDays: PropTypes.array,
  setDeliveryInfoCart: PropTypes.func
};

export default connect(mapStateToProps, {
  setDeliveryInfoCart
})(PickupTimeModal);
