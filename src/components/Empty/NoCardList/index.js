import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/svgs/empty/no_payment_methods.svg';
import './index.css';

const NoCardList = () => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_cardlist_view'}>
      <img src={Svg_img} />
      <div className={'description'} style={{ marginTop: 16 }}>
        {t('payment_method.empty_desc')}
      </div>
    </div>
  );
};

function arePropsEqual() {
  return true;
}
export default React.memo(NoCardList, arePropsEqual);
