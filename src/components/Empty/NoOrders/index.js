import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/svgs/empty/no_orders.svg';
import PropTypes from 'prop-types';
import './index.css';
import { MainBtn } from '../../Buttons';
import { useNavigate } from 'react-router-dom';
import { ROUTES_NAMES } from '../../../constants';

const NoOrders = ({ isCurrent, style }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className={'align-col-middle no_orders_view'} style={style}>
      <img src={Svg_img} />
      <div className={'description'} style={{ marginTop: 16 }}>
        {isCurrent === true ? t('orders.no_recent_orders') : t('orders.no_past_orders')}
      </div>
      <div className={'description'} style={{ marginBottom: 16 }}>
        {t('orders.no_recent_orders_message')}
      </div>
      <div style={{ width: '80%', paddingHorizontal: 20, paddingBottom: 10, marginTop: 10 }}>
        <MainBtn
          title={t('orders.order_now')}
          onClick={(e) => {
            e.preventDefault();
            navigate(ROUTES_NAMES.home);
          }}
        />
      </div>
    </div>
  );
};

NoOrders.propTypes = {
  isCurrent: PropTypes.bool,
  style: PropTypes.object
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.isCurrent === nextProps.isCurrent;
}
export default React.memo(NoOrders, arePropsEqual);
