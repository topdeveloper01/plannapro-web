import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MainBtn } from '../../components/Buttons';
import { AuthInput } from '../../components/Inputs';
import Spacing from '../../components/Spacing';
import { login, setAsLoggedIn } from '../../store/actions/auth';
import { validateEmailAddress , PrintLog} from '../../utils/common';
import './index.css';
import { ROUTES_NAMES } from '../../constants';
import { confirmAlert } from "react-confirm-alert";

const LoginForm = (props) => {
  const { onChangeView, setAsLoggedIn } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const _handleChange = (name, value) => {
    setState({
      ...state,
      [name]: value
    });
  };

  const _login = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (email === '' || password === '') {
      return;
    }
    console.log('================ login');
    if (validateEmailAddress(email) === false) {
      return;
    }
    setLoading(true);
    try {
      await props.login({ email, password });
      await setAsLoggedIn();
      setLoading(false);
      navigate(ROUTES_NAMES.home);
    } catch (e) {
      PrintLog('login', e);
      setLoading(false);
      const message = e.message || t('checkout.something_is_wrong');
      return confirmAlert({
        title: t('alerts.error'),
        message: message,
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
  };

  return (
    <div className='auth-form'>
      <h1>{t('auth_login.header')}</h1>
      <h3>{t('auth_login.header1')}</h3>
      <AuthInput
        name={'email'}
        placeholder={t('auth_login.email')}
        onChange={(v) => {
          _handleChange('email', v);
        }}
      />
      <AuthInput
        name={'password'}
        placeholder={t('auth_login.password')}
        isSecure={true}
        onChange={(v) => {
          _handleChange('password', v);
        }}
      />
      <div className={'forgot-pass'}>
        <div
          className={'forgot-pass-btn'}
          onClick={() => {
            onChangeView('forgot-pass');
          }}>
          {t('auth_login.forgot_pass')}
        </div>
      </div>
      <Spacing height={32} />
      <MainBtn isLoading={loading} title={t('auth_login.submit')} onClick={_login} />
      <Spacing height={40} />
      <div className={'center-align auth-bottom-link'}>
        <div className={'text'}>{t('auth_login.dont_have_account')}</div>
        <div
          className={'btn'}
          onClick={() => {
            onChangeView('register');
          }}>
          {t('auth_login.create_account')}
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onChangeView: PropTypes.func,
  login: PropTypes.func,
  setAsLoggedIn: PropTypes.func
};

function mapStateToProps({ app }) {
  return {
    user: app.user,
    hasVerifiedPhone: app.hasVerifiedPhone
  };
}

export default connect(mapStateToProps, {
  login,
  setAsLoggedIn
})(LoginForm);
