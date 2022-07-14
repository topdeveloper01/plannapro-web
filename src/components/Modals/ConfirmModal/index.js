import React from 'react';
import { Dialog } from '@mui/material';
import PropTypes from 'prop-types';
import './index.css';

const ConfirmModal = ({ showModal, title, yes, no, onYes, onClose }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  return (
    <Dialog open={open} className={'align-col-middle w100 modal confirm-modal'}>
      <div className={'align-col-middle content'}>
        <h2>{title}</h2>
        <div className={'flex_1 align-middle w100 actions mt12'}>
          <div onClick={onYes} className={'yes_btn'}>
            {yes}
          </div>
          <div onClick={onClose} className={'no_btn'}>
            {no}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.showModal === nextProps.showModal &&
    prevProps.title === nextProps.title &&
    prevProps.yes === nextProps.yes &&
    prevProps.no === nextProps.no
  );
}

ConfirmModal.propTypes = {
  showModal: PropTypes.bool,
  title: PropTypes.string,
  yes: PropTypes.string,
  no: PropTypes.string,
  onYes: PropTypes.func,
  onClose: PropTypes.func
};
export default React.memo(ConfirmModal, arePropsEqual);
