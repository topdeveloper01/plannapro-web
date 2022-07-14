import React from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Seo title={t('web_title.not_found')} />
      <h1>not found</h1>
    </div>
  );
};

export default NotFound;
