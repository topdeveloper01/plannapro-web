import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/images/vendor/no_location.png';
import PropTypes from 'prop-types';
import './index.css';

const NoLocation = ({ style }) => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_location_view'} style={style}>
      <img src={Svg_img} />
      <div className={'description'} style={{ marginTop: 16 }}>
        {t('vendors_list.no_location')}
      </div>
    </div>
  );
};

NoLocation.propTypes = {
  style: PropTypes.object
};

function arePropsEqual() {
  return true;
}
export default React.memo(NoLocation, arePropsEqual);
