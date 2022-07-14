import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import querystring from 'query-string';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ForgotPassForm from './ForgotPassForm';
import AuthLayout from '../layout';
import Seo from '../../../components/Seo';
import { ROUTES_NAMES } from '../../../constants';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [view_type, setViewType] = useState('login');
  const parsed = querystring.parse(location.search);
  const { t } = useTranslation();
  useEffect(() => {
    setViewType(parsed.view || 'login');
  }, [parsed.view]);

  return (
    <AuthLayout testId="view-login" className={'view-login'}>
      <React.Fragment>
        {view_type === 'login' && (
          <div>
            <Seo title={t('web_title.login')} />
            <LoginForm
              onChangeView={(type) => {
                navigate(ROUTES_NAMES.login + `?view=${type}`);
              }}
            />
          </div>
        )}

        {view_type === 'register' && (
          <div>
            <Seo title={t('web_title.register')} />
            <RegisterForm
              onChangeView={(type) => {
                navigate(ROUTES_NAMES.login + `?view=${type}`);
              }}
            />
          </div>
        )}

        {view_type === 'forgot-pass' && (
          <div>
            <Seo title={t('web_title.forgot_password')} />
            <ForgotPassForm
              onChangeView={(type) => {
                navigate(ROUTES_NAMES.login + `?view=${type}`);
              }}
            />
          </div>
        )}
      </React.Fragment>
    </AuthLayout>
  );
};

export default Login;
