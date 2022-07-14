import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/svgs/empty/no_home.svg';
import './index.css';
import PropTypes from 'prop-types';

const NoRestaurants = ({ title, desc, style }) => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_restaurant_view'} style={style}>
      <img src={Svg_img} style={{ width: 300, height: 110, objectFit: 'contain' }} />
      <div className={'description'} style={{ marginTop: 16 }}>
        {title ? title : t('soon_in_your_area')}
      </div>
      <div className={'description'} style={{ marginBottom: 16 }}>
        {desc ? desc : t('soon_in_your_area_desc')}
      </div>
    </div>
  );
};

NoRestaurants.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  style: PropTypes.object
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.title === nextProps.title && prevProps.desc === nextProps.desc;
}
export default React.memo(NoRestaurants, arePropsEqual);
