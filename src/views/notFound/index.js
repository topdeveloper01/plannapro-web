import React from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Seo title={t('web_title.not_found')} />
      <div className={'align-col-middle w100 h100'} style={{height: '50vh'}}>
        <h1>Not Found</h1>
      </div>
    </div>
  );
};

export default NotFound;
