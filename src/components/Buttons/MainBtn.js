import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import './index.css';

const MainBtn = ({ title, className, style, onClick }) => {
  return (
    <Button
      variant="contained"
      className={`app-btn main-btn ${className}`}
      style={style}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

MainBtn.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};
export default React.memo(MainBtn);
