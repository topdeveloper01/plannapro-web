import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/svgs/empty/no_cashback.svg';
import './index.css';

const NoCashback = () => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_cashback_view'}>
      <img src={Svg_img} />
      <div className={'description'} style={{ marginTop: 16 }}>
        {t('wallet.empty_desc')}
      </div>
    </div>
  );
};

function arePropsEqual() {
  return true;
}
export default React.memo(NoCashback, arePropsEqual);
