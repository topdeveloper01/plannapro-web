import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/images/empty/nopromo.png';
import './index.css';

const NoPromoList = () => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_promolist_view'}>
      <img src={Svg_img} style={{ width: 300, height: 110, objectFit: 'contain' }} />
      <div className={'description'} style={{ marginTop: 16 }}>
        {t('promotions.no_promotions')}
      </div>
      <div className={'description'} style={{ marginBottom: 16 }}>
        {t('promotions.no_promotions_message')}
      </div>
    </div>
  );
};

function arePropsEqual() {
  return true;
}
export default React.memo(NoPromoList, arePropsEqual);
