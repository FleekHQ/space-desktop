import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UploadProgressModal from './UploadProgress';

import {
  closeModal,
  UPLOAD_PROGRESS_MODAL,
} from './actions';

const MODALS = {
  [UPLOAD_PROGRESS_MODAL]: UploadProgressModal,
};

const Modal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal);

  const closeModalHandler = () => dispatch(closeModal());

  if (!modalState.open) return null;

  const ModalComponent = MODALS[modalState.id];

  if (!ModalComponent) return null;

  return (
    <ModalComponent
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...modalState.props}
      closeModal={closeModalHandler}
      open
    />
  );
};

export default Modal;
