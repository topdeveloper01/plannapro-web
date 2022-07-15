import React, { useState } from 'react';
import './index.css';
import PropTypes from 'prop-types';
import ProCalendar from '../ProCalendar';

const EventDatePicker = ({ minDate, className, onSelectDate }) => {
  const defaultValue = {
    year: 2019,
    month: 3,
    day: 1
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  const onChangeDate = (date) => {
    setSelectedDay(date);
    onSelectDate(date);
  };

  console.log(selectedDay)
  return (
    <div className={'w100 align-col-middle event-date-picker ' + className}>
      <ProCalendar
        minDate={minDate}
        onSelectDate={onChangeDate}
      />
    </div>
  );
};

EventDatePicker.propTypes = {
  minDate: PropTypes.object,
  className: PropTypes.string,
  onSelectDate: PropTypes.func
};

export default EventDatePicker;
