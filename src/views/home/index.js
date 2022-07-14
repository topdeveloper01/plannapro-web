import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import CityMap from '../../components/Home/CityMap';
import AppDownloads from '../../components/Home/AppDownloads';
import PopularMenus from '../../components/Home/PopularMenus';
import ApplyBusinessCard from '../../components/Home/ApplyBusinessCard';
import AppIntro from '../../components/Home/AppIntro';
import './index.css';
import Seo from '../../components/Seo';
import Banner from '../../components/Home/Banner';
import WhereHeardModal from '../../components/Modals/WhereHeardModal';
import { setShowWhereHeardFeedbackModal , setAppHeaderClass} from '../../store/actions/app';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

const Home = (props) => {
  const { t } = useTranslation();

  useEffect(() =>{
    props.setAppHeaderClass('app-home-header');
    return () => {
      props.setAppHeaderClass('');
    };
  }, [])

  useEffect(()=>{
    if (props.isLoggedIn) {
      props.setShowWhereHeardFeedbackModal(true);
    }
  }, [props.isLoggedIn])

  return (
    <div data-testid="view-home" className={'view-home'}>
      <Seo title={t('web_title.default')} />
      <Banner />
      <div className={'w100 align-col-middle'}>
        <AppDownloads />
      </div>
      <div className={'w100 align-col-middle'}>
        <PopularMenus />
      </div>
      <CityMap />
      <Grid container spacing={{ xs: 2, md: 5 }} className={'align-middle mt10 ph4'}>
        <Grid item xs={12} lg={6}   style={{}}>
          <ApplyBusinessCard type={'vendor'} />
        </Grid>
        <Grid item xs={12} lg={6}  style={{}}>
          <ApplyBusinessCard type={'rider'} />
        </Grid>
      </Grid>
      <AppIntro />
      {
        props.show_feedback_where_heard_modal && <WhereHeardModal />
      }
    </div>
  );
};

Home.propTypes = {
  isLoggedIn : PropTypes.bool,
  show_feedback_where_heard_modal: PropTypes.bool,
  setShowWhereHeardFeedbackModal: PropTypes.func,
  setAppHeaderClass : PropTypes.func
};

const mapStateToProps = ({ app  }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn,
  show_feedback_where_heard_modal: app.show_feedback_where_heard_modal,
});

export default connect(mapStateToProps, {
  setShowWhereHeardFeedbackModal, setAppHeaderClass
})(Home);
