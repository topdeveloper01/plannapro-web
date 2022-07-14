import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/svgs/empty/no_fav_vendors.svg';
import PropTypes from 'prop-types';
import './index.css';

const NoFavs = ({ isVendor, style }) => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_fav_view'} style={style}>
      <img src={Svg_img} />
      <div className={'description'} style={{ marginTop: 16 }}>
        {isVendor === true ? t('account.no_vendor_fav') : t('account.no_item_fav')}
      </div>
      <div className={'description'} style={{ marginBottom: 16 }}>
        {isVendor === true ? t('account.no_vendor_fav_desc') : t('account.no_item_fav_desc')}
      </div>
    </div>
  );
};

NoFavs.propTypes = {
  isVendor: PropTypes.bool,
  style: PropTypes.object
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.isVendor === nextProps.isVendor;
}
export default React.memo(NoFavs, arePropsEqual);
