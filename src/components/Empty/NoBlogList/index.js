import React from 'react';
import { useTranslation } from 'react-i18next';
import Svg_img from '../../../assets/images/empty/noblog.png';
import './index.css';

const NoBlogList = () => {
  const { t } = useTranslation();
  return (
    <div className={'align-col-middle no_bloglist_view'}>
      <img src={Svg_img} style={{ width: 200, height: 180, objectFit: 'contain' }} />

      <div className={'description'} style={{ marginTop: 16 }}>
        {t('blog.no_blog')}
      </div>
      <div className={'description'} style={{ marginBottom: 16 }}>
        {t('blog.no_blog_message')}
      </div>
    </div>
  );
};

function arePropsEqual() {
  return true;
}
export default React.memo(NoBlogList, arePropsEqual);
