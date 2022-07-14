import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './index.css';
import Seo from '../../components/Seo';
import { setAppHeaderClass } from '../../store/actions/app';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Home = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    props.setAppHeaderClass('app-home-header');
    return () => {
      props.setAppHeaderClass('');
    };
  }, []);


  return (
    <div data-testid="view-home" className={'view-home'}>
      <Seo title={t('web_title.default')}/>
      <div className={'calendar-container'} style={{height: '70vh'}}>

      </div>
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  setAppHeaderClass: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn
});

export default connect(mapStateToProps, {
  setAppHeaderClass
})(Home);
