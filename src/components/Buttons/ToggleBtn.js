import React from 'react';
import PropTypes from 'prop-types';
import Svg_checked from '../../assets/svgs/buttons/toggleon.svg';
import Svg_unchecked from '../../assets/svgs/buttons/toggleoff.svg';

const ToggleBtn = ({ isOn, onClick }) => {
    return (
      <img
        src={isOn === true ? Svg_checked : Svg_unchecked}
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      />
    );
  }
;

ToggleBtn.propTypes = {
  isOn: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func
};
export default ToggleBtn;
