import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import { OutlineBtn, MainBtn } from '../Buttons';
import Cashback from './Cashback';
import { toggleSideBar } from '../../store/actions/app';
import './index.css';
import { ROUTES_NAMES } from '../../constants';
import { getImageFullURL } from '../../utils/common';
import Svg_orders from '../../assets/svgs/sidebar/orders.svg';
import Svg_favorites from '../../assets/svgs/sidebar/favorites.svg';
import Svg_chat from '../../assets/svgs/sidebar/chat_inactive.svg';
import { confirmAlert } from 'react-confirm-alert';
import { logout } from '../../store/actions/auth';

const Sidebar = (props) => {
  const { isSidebarOpened, toggleSideBar, user, isLoggedIn } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const toggleDrawer = (event) => {
    event.preventDefault();
    toggleSideBar();
  };

  const GUEST_MENUS = [
    t('sidebar.about_us'),
    t('sidebar.terms'),
    t('sidebar.privacy'),
    t('sidebar.help')
  ];
  const USER_MENUS = [
    t('sidebar.about_us'),
    t('sidebar.terms'),
    t('sidebar.privacy'),
    t('sidebar.help')
  ];
  const goScreen = (name) => {
    if (name === t('sidebar.blog')) {
      navigate(ROUTES_NAMES.blog);
    } else if (name === t('sidebar.about_us')) {
      navigate(ROUTES_NAMES.contact);
    }
    else if (name === t('sidebar.download_app')) {
      navigate(ROUTES_NAMES.downloadApp);
    }
    else if (name === t('sidebar.terms')) {
      navigate(ROUTES_NAMES.terms_conditions);
    } else if (name === t('sidebar.privacy')) {
      navigate(ROUTES_NAMES.privacyPolicy.privacy_main);
    }
    else if (name === t('sidebar.help')) {
      navigate(ROUTES_NAMES.help.index);
    } 
  };

  const doLogout = () => {
    confirmAlert({
      title: t('alerts.confirm_logout_title'),
      message: t('alerts.confirm_logout'),
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: t('alerts.yes'),
          onClick: async () => {
            try {

              await props.logout();
              navigate('/');
              // eslint-disable-next-line no-empty
            } catch (e) {}
          }
        },
        {
          label: t('alerts.no'),
          onClick: () => {}
        }
      ]
    });
  };


  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      className={'app-sidebar'}>
      {isLoggedIn ? (
        <div className={'align-col-middle'}>
          <div className={'align-row-start user-info'}>
            <img src={getImageFullURL(user.photo)} />
            <div className={'align-start flex_1 pl-10'}>
              <h2>{user.full_name}</h2>
              <Link to={ROUTES_NAMES.profile}>{t('sidebar.view_profile')}</Link>
            </div>
            <Cashback value={1029} />
          </div>
          <List className={'w100'}>
            <ListItem
              button
              className={'list-btn'}
              onClick={(e) => {
                e.preventDefault();
                goScreen(t('sidebar.orders'));
              }}>
              <img src={Svg_orders} className={'pr1'} />
              <ListItemText primary={t('sidebar.orders')} />
            </ListItem>
            <ListItem
              button
              className={'list-btn'}
              onClick={(e) => {
                e.preventDefault();
                goScreen(t('sidebar.favorites'));
              }}>
              <img src={Svg_favorites} className={'pr1'} />
              <ListItemText primary={t('sidebar.favorites')} />
            </ListItem>
            <ListItem
              button
              className={'list-btn'}
              onClick={(e) => {
                e.preventDefault();
                goScreen(t('sidebar.social'));
              }}>
              <img src={Svg_chat} className={'pr1'} />
              <ListItemText primary={t('sidebar.chat')} />
              <div className={'new_msg_tag'}>3 {t('sidebar.new_messages')}</div>
            </ListItem>
          </List>
        </div>
      ) : (
        <Container fluid className={'drawer-body'}>
          <Row>
            <Col xs={12} sm={12} md={6} style={{paddingBottom: 10}}>
              <OutlineBtn
                title={t('sidebar.create_account')}
                style={{ height: 48 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(ROUTES_NAMES.login + '?view=register');
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={6}>
              <MainBtn
                title={t('sidebar.login')}
                style={{ height: 48 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(ROUTES_NAMES.login + '?view=login');
                }}
              />
            </Col>
          </Row>
        </Container>
      )}
      {isLoggedIn && <Divider />}
      <List>
        {(isLoggedIn ? USER_MENUS : GUEST_MENUS).map((text) => (
          <ListItem
            button
            key={text}
            className={'list-btn'}
            onClick={(e) => {
              e.preventDefault();
              goScreen(text);
            }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {isLoggedIn && <Divider />}
      {isLoggedIn && (
        <ListItem
          button
          className={'list-btn'}
          onClick={(e) => {
            e.preventDefault();
            doLogout();
          }}>
          <ListItemText primary={t('sidebar.logout')} />
        </ListItem>
      )}
      <Divider />
      <List>
        {[t('sidebar.become_partner'), t('sidebar.become_rider')].map((text) => (
          <ListItem
            button
            key={text}
            className={'list-btn'}
            onClick={(e) => {
              e.preventDefault();
              goScreen(text);
            }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={'left'} open={isSidebarOpened} onClose={toggleDrawer}>
      {list()}
      <div className={'align-col-middle drawer-apps'}>
        <h4>{t('sidebar.do_more_app')}</h4>
        <div className="align-middle badge-wrap">
          <a
            href="https://itunes.apple.com/al/app/xxx"
            rel={'noreferrer'}
            target="_blank"
            className="badge badge-ios"
          />
          <a
            href="https://play.google.com/store/apps/xxx"
            target="_blank"
            rel={'noreferrer'}
            className="badge badge-android"
          />
        </div>
      </div>
    </Drawer>
  );
};
Sidebar.propTypes = {
  user: PropTypes.shape({
    full_name: PropTypes.string,
    photo: PropTypes.string
  }),
  isLoggedIn: PropTypes.bool,
  isSidebarOpened: PropTypes.bool,
  toggleSideBar: PropTypes.func,
  logout : PropTypes.func
};

function mapStateToProps({ app }) {
  return {
    user: app.user,
    isLoggedIn: app.isLoggedIn,
    hasVerifiedPhone: app.hasVerifiedPhone,
    isSidebarOpened: app.isSidebarOpened,
  };
}
export default connect(mapStateToProps, {
  toggleSideBar, logout
})(Sidebar);