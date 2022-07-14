import React from 'react';
import PropTypes from 'prop-types';
import useLongPress from '../../../components/Hooks/useLongPress';

const LongPressDiv = (props) => {
  const longPress = useLongPress(props.onLongPress, props.delay || 800);
  return (
    <div {...props} {...longPress}>
      {props.children}
    </div>
  );
};

LongPressDiv.propTypes = {
  children: PropTypes.element,
  onLongPress: PropTypes.func,
  delay: PropTypes.number
};

export default React.memo(LongPressDiv);
