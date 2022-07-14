import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthBtn } from '../../../components/Buttons';
import { AuthInput } from '../../../components/Inputs';
import Spacing from '../../../components/Spacing';
import { PrintLog } from '../../../utils/common';
import './index.css';
import { ROUTES_NAMES } from '../../../constants';

const RegisterForm = ({ onChangeView }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="auth-form">
      <h1>{t('auth_register.header')}</h1>
      <h3>{t('auth_register.header1')}</h3>
      <AuthInput
        placeholder={t('auth_register.full_name')}
        onChange={(e) => {
          PrintLog(e.target.value);
        }}
      />
      <AuthInput
        placeholder={t('auth_register.email')}
        onChange={(e) => {
          PrintLog(e.target.value);
        }}
      />
      <AuthInput
        placeholder={t('auth_register.cell')}
        onChange={(e) => {
          PrintLog(e.target.value);
        }}
      />
      <AuthInput
        placeholder={t('auth_register.password')}
        isSecure={true}
        onChange={(e) => {
          PrintLog(e.target.value);
        }}
      />
      <Spacing height={28} />
      <AuthBtn
        title={t('auth_register.submit')}
        onClick={() => {
          navigate(ROUTES_NAMES.verification);
        }}
      />
      <Spacing height={20} />
      <div className={'center-align auth-bottom-link'}>
        <div className={'text'}>{t('auth_register.already_registered')}</div>
        <div
          className={'btn'}
          onClick={() => {
            onChangeView('login');
          }}
        >
          {t('auth_register.sign_in')}
        </div>
      </div>
    </div>
  );
};

RegisterForm.propTypes = {
  onChangeView: PropTypes.func
};
export default RegisterForm;
