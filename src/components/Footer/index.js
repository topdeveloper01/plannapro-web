import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES_NAMES } from '../../constants';
import Logo from '../Logo';
import Svg_facebook from '../../assets/svgs/footer/facebook.svg';
import Svg_twitter from '../../assets/svgs/footer/twitter.svg';
import Svg_instagram from '../../assets/svgs/footer/instagram.svg';
import './index.css';

const Footer = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const MENU_LINKS = [
    {
      label: t('footer.about_us'),
      link: ROUTES_NAMES.about
    },
    {
      label: t('footer.careers'),
      link: ROUTES_NAMES.careers
    },
    {
      label: t('footer.blog'),
      link: ROUTES_NAMES.blog
    },
    {
      label: t('footer.help'),
      link: ROUTES_NAMES.help.index
    },
    {
      label: t('footer.contact_us'),
      link: ROUTES_NAMES.contact
    }
  ];
  const WORKS_LINKS = [
    {
      label: t('footer.become_merchant'),
      link: ROUTES_NAMES.becomePartner
    },
    {
      label: t('footer.become_rider'),
      link: ROUTES_NAMES.becomeCourier
    }
  ];
  const onLinkClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer
      className="footer footer-dark-img"
      style={{ backgroundColor: location.pathname === ROUTES_NAMES.home ? 'transparent' : 'transparent' }}
    >
      <Container fluid>
        <Row justify="around">
          <Col xs={12} sm={6} md={4} xl={3} xxl={2}>
            <Logo className={'logo'} type={'white'} />
          </Col>
          <Col xs={12} sm={6} md={4} xl={3} xxl={2}>
            <div>
              <ul>
                {MENU_LINKS.map((linkItem) => (
                  <li key={linkItem.label}>
                    <Link to={linkItem.link} onClick={onLinkClick}>
                      {linkItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} xl={3} xxl={2}>
            <h4 className="subject">{t('footer.let_work_together')}</h4>
            <div>
              <ul>
                {WORKS_LINKS.map((linkItem) => (
                  <li key={linkItem.label}>
                    <Link to={linkItem.link} onClick={onLinkClick}>
                      {linkItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xs={12} sm={6} md={4} xl={3} xxl={2}>
            <h4 className="subject">{t('footer.find_us_online')}</h4>
            <div className={'align-row-start social'}>
              <a
                href="https://www.instagram.com//"
                rel={'noreferrer'}
                target="_blank"
                className="badge badge-ios"
              >
                <img src={Svg_instagram} />
              </a>
              <a
                href="https://www.facebook.com//"
                rel={'noreferrer'}
                target="_blank"
                className="badge badge-ios"
              >
                <img src={Svg_facebook} />
              </a>
              <a
                href="https://twitter.com/?lang=en"
                rel={'noreferrer'}
                target="_blank"
                className="badge badge-ios"
              >
                <img src={Svg_twitter} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
