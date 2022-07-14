import React from 'react';
import Svg_img from '../../../assets/images/empty/no_friend.png';
import './index.css';
import PropTypes from 'prop-types';

const NoFriendList = ({ title, desc }) => {
  return (
    <div className={'align-col-middle no_friends_view'}>
      <img src={Svg_img} style={{ height: 218, width: 175, objectFit: 'contain' }} />
      <div className={'description'} style={{ marginTop: 32 }}>
        {title}
      </div>
      <div className={'description'} style={{ marginBottom: 16 }}>
        {desc}
      </div>
    </div>
  );
};

NoFriendList.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.title === nextProps.title && prevProps.desc === nextProps.desc;
}
export default React.memo(NoFriendList, arePropsEqual);
