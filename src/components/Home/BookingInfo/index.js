import React, { useState } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { setAppHeaderClass } from '../../../store/actions/app';
import PropTypes from 'prop-types';
import Svg_Leaves from '../../../assets/images/app/Leaves.svg';
import Svg_time from '../../../assets/images/icons/time-icon.svg';
import Svg_pound from '../../../assets/images/icons/pound-coin-icon.svg';
import Svg_video from '../../../assets/images/icons/video-icon.svg';
import Svg_desc from '../../../assets/images/icons/description-icon.svg';


const BookingInfo = () => {
  const services = [
    { id: 0, title: 'Ask a Pro' },
    { id: 1, title: 'Provide a quote' },
    { id: 2, title: 'Summer Package' },
    { id: 3, title: 'Call Out' }
  ];
  const [selectedService, setSelectedService] = useState(0);

  return (
    <div className={'booking-info-view'}>
      <div className={'align-middle title-view pb3'}>
        <img src={Svg_Leaves} className={'mr2'}/>
        <h5>The Conscious Gardening Co.</h5>
      </div>
      <div className={'services'}>
        <p>Service Needed</p>
        <div className={'w100 flex_wrap items'}>
          {
            services.map((service) =>
              <div key={service.id}
                   className={service.id == selectedService ? 'service-item-active' : 'service-item-inactive'}
              onClick={()=>{
                setSelectedService(service.id)
              }}
              >{service.title}</div>
            )
          }
        </div>
      </div>
      <div className={'service-detail'}>
        <h5>15 minute video consulation with Cameron Macfie</h5>
        <div className={'align-row-start w100 pro'}>
          <img src={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}/>
          <div className={'ml2'}>
            <h6>Cameron Macfie</h6>
            <p>View Profile</p>
          </div>
        </div>
        <div className={'align-row-start mt3'}>
          <img src={Svg_time}/>
          <p className={'desc ml2'}>15 mins</p>
        </div>
        <div className={'align-row-start mt3'}>
          <img src={Svg_pound}/>
          <p className={'desc ml2'}>£50</p>
        </div>
        <div className={'align-row-start mt3'}>
          <img src={Svg_video}/>
          <p className={'desc ml2'}>Virtual Appointment details provided upon Pro confirmation.</p>
        </div>
        <div className={'align-row-start mt3'}>
          <img src={Svg_desc}/>
          <p className={'desc ml2'}>On-demand expert help and advice</p>
        </div>
      </div>
    </div>
  );
};

BookingInfo.propTypes = {
  isLoggedIn: PropTypes.bool,
  setAppHeaderClass: PropTypes.func
};

const mapStateToProps = ({ app }) => ({
  user: app.user || {},
  isLoggedIn: app.isLoggedIn
});

export default connect(mapStateToProps, {
  setAppHeaderClass
})(BookingInfo);
