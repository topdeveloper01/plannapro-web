import React, {  useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MainBtn } from '../../components/Buttons';
import { AuthInput } from '../../components/Inputs';
import Spacing from '../../components/Spacing';
import { validateEmailAddress } from '../../utils/common';
import './index.css';
import { ROUTES_NAMES } from '../../constants';
import { confirmAlert } from 'react-confirm-alert';
import apiFactory from '../../services/apiFactory';
import { Storage } from '../../services';

const ForgotPassForm = ({ onChangeView }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email == '') {
      return confirmAlert({
        title: null,
        message: t('auth_login.validate_email'),
        closeOnEscape: true,
        closeOnClickOutside: true,
        buttons: [
          {
            label: t('Ok'),
            className: 'error-ok-btn',
            onClick: () => {
            }
          }
        ]
      });
    }
    if (validateEmailAddress(email) === false) {
      return confirmAlert({
        title: null,
        message: t('auth_login.validate_email_format'),
        closeOnEscape: true,
        closeOnClickOutside: true,
        buttons: [
          {
            label: t('Ok'),
            className: 'error-ok-btn',
            onClick: () => {
            }
          }
        ]
      });
    }
    setLoading(true);
    apiFactory.post(`forgot-password`, {email}).then(
      async () => {
        setLoading(false);
        Storage.setStorageKey(Storage.KEYS.TMP_FORGOT_EMAIL, email);
        navigate(ROUTES_NAMES.resetPass);
      },
      async (err) => {
        setLoading(false);
        console.log('forgot-password err ', err);
        return confirmAlert({
          title: t('alerts.error'),
          message: t('checkout.something_is_wrong'),
          closeOnEscape: true,
          closeOnClickOutside: true,
          buttons: [
            {
              label: t('Ok'),
              className: 'error-ok-btn',
              onClick: () => {
              }
            }
          ]
        });
      }
    );
  };

  return (
    <div className='auth-form'>
      <h1>{t('forgot_password.header')}</h1>
      <h3>{t('forgot_password.header1')}</h3>
      <AuthInput
        placeholder={t('auth_login.email')}
        onChange={(e) => {
          setEmail(e);
        }}
      />
      <Spacing height={32} />
      <MainBtn
        isLoading={isLoading}
        title={t('confirm')}
        onClick={onSubmit}
      />
      <Spacing height={40} />
      <div className={'center-align'}>
        <div
          className={'cancel-btn'}
          onClick={() => {
            onChangeView('login');
          }}
        >
          {t('cancel')}
        </div>
      </div>
    </div>
  );
};

ForgotPassForm.propTypes = {
  onChangeView: PropTypes.func
};

export default ForgotPassForm;
