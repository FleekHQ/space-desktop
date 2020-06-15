import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UploadProgressModal from './UploadProgress';

import {
  closeModal as closeModalAction,
  UPLOAD_PROGRESS_MODAL,
} from './actions';

const MODALS = {
  [UPLOAD_PROGRESS_MODAL]: UploadProgressModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals);

  return modals.map((modalProps) => {
    const ModalComponent = MODALS[modalProps.type];
    const closeModal = () => dispatch(closeModalAction(modalProps.id));

    return (
      <ModalComponent
        open
        key={modalProps.id}
        closeModal={closeModal}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...modalProps}
      />
    );
  });
};

export default Modal;
