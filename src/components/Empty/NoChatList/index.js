import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/svgs/empty/no_chat.svg';
import Svg_addchat from '../../../assets/svgs/empty/add_chat.svg';
import './index.css';

const NoChatList = () => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_promolist_view'}>
      <img src={Svg_img} />

      <div className={'description'} style={{ marginTop: 16 }}>
        {t('social.no_chat_history')}
      </div>
      <div className={'description'}>{t('social.no_chat_history_desc1')}</div>
      <div className={'align-middle'}>
        <div className={'description'} style={{ paddingLeft: 0, paddingRight: 0 }}>
          {t('social.no_chat_history_desc2')}
        </div>
        <img src={Svg_addchat} style={{ marginLeft: 6, marignRight: 2, width: 15, height: 15 }} />
        <div className={'description'} style={{ paddingLeft: 4, paddingRight: 0 }}>
          {t('social.no_chat_history_desc3')}
        </div>
      </div>
    </div>
  );
};

function arePropsEqual() {
  return true;
}
export default React.memo(NoChatList, arePropsEqual);
