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
import { Theme } from '../../../assets';
import MoreorlessView from '../../Common/MoreorlessView';
import PostCode from '../../Inputs/PostCode';


const BookingInfo = () => {
  const services = [
    { id: 0, title: 'Ask a Pro' },
    { id: 1, title: 'Provide a quote' },
    { id: 2, title: 'Summer Package' },
    { id: 3, title: 'Call Out' }
  ];
  const discounts = [
    { cnt: 1, value: 220 }, { cnt: 5, value: 210 }, { cnt: 10, value: 200 }, { cnt: 15, value: 190 },
    { cnt: 20, value: 180 }, { cnt: 25, value: 170 }, { cnt: 30, value: 160 }, { cnt: 35, value: 150 }
  ];
  const packages = ['Hedge cutting', 'Tree and shrub pruning', 'Deadheading', 'Weeding', 'Feeding plants with organic liquid feed', 'Lawn mowing', 'Jet wash of decking and paving']

  const [selectedService, setSelectedService] = useState(0);

  const _renderDetailsInfo = () => {
    if (selectedService == 0 || selectedService == 1) {
      return (
        <>
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
        </>
      );
    } else if (selectedService == 2) { // summer package
      return (
        <>
          <div className={'align-row-start mt3'}>
            <img src={Svg_time} className={'mr2'}/>
            <p className={'desc'}>9th - 27th May</p>
          </div>
          <div className={'align-row-start-start mt3'}>
            <img src={Svg_pound} className={'mr2'}/>
            <div className={'flex_1'}>
              <p className={'desc'} style={{ color: Theme.colors.primary }}>Collective Discount Available</p>
              <MoreorlessView className={'mt1'}>
                <div className={'w100'}>
                  {
                    discounts.map((discount) =>
                      <div key={discount.cnt} className={'align-row-start w100 mt1'}>
                        <div className={'flex_1 discount_label'}>Price for ${discount.cnt} customer</div>
                        <div className={'discount_value'}>£{discount.value}</div>
                      </div>
                    )
                  }
                </div>
              </MoreorlessView>
            </div>
          </div>
          <div className={'align-row-start-start mt3'}>
            <img src={Svg_desc} className={'mr2'}/>
            <div className={'flex_1'}>
              <p className={'desc'}>Recommended once a year in the Spring or Summer. Complete garden tidy, front and
                back.</p>
              <MoreorlessView className={'mt2'}>
                <div className={'w100'}>
                  <div className={'discount_label'}>Package includes:</div>
                  {
                    packages.map((item) =>
                      <div key={item} className={'align-row-start w100 mt1'}>
                        <div className={'dot mr1'} />
                        <div className={'discount_value'}>{item}</div>
                      </div>
                    )
                  }
                  <div className={'align-row-start-start mt2 package-highlighted'}>
                    <div className={'mr1'}>*</div>
                    <div>
                      We only  use organic products and avoid using any unnatural chemicals in the garden.
                    </div>
                  </div>
                </div>
              </MoreorlessView>
            </div>
          </div>
          <div className={'align-row-start mt3'}>
            <PostCode />
          </div>
        </>
      );
    } else { // call out
      return (
        <>
          <div className={'align-row-start mt3'}>
            <img src={Svg_time}/>
            <p className={'desc ml2'}>1 hour</p>
          </div>
          <div className={'align-row-start mt3'}>
            <img src={Svg_pound}/>
            <p className={'desc ml2'}>£100</p>
          </div>
          <div className={'align-row-start mt3'}>
            <img src={Svg_desc}/>
            <p className={'desc ml2'}>Home visit. Cost is for the first hour only.</p>
          </div>
          <div className={'align-row-start mt3'}>
            <PostCode />
          </div>
        </>
      );
    }
  };

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
                   onClick={() => {
                     setSelectedService(service.id);
                   }}
              >{service.title}</div>
            )
          }
        </div>
      </div>
      <div className={'service-detail'}>
        {
          (selectedService == 0 || selectedService == 1) ?
            <h5>15 minute video consulation with Cameron Macfie</h5>
            :
            selectedService == 2 ?
              <h5>Summer Garden Tidy-Up Package With Cameron Macfie</h5>
              :
              <h5>1 hour meeting with Cameron Macfie</h5>
        }
        <div className={'align-row-start w100 pro'}>
          <img src={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'}/>
          <div className={'ml2'}>
            <h6>Cameron Macfie</h6>
            <p>View Profile</p>
          </div>
        </div>
        {_renderDetailsInfo()}
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
