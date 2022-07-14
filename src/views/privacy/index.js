import React, {useEffect, useState} from 'react';
import Seo from '../../components/Seo';
import './index.css';


const PrivacyPolicyMain = () => { 
  return (
    <div data-testid='view-terms' className={'align-col-middle view-terms'}>
      <Seo title={t('web_title.privacy_policy')} />
      <div style={{ width: '100%', maxWidth : 800 }}>
        <h1 style={{width: '100%', textAlign: 'left'}}>
        {t('privacy_policy')}
        </h1>
      </div>
    </div>
  );
};

export default PrivacyPolicyMain;
