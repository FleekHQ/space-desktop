/* Action Types */
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

/* Modal Ids */
export const UPLOAD_PROGRESS_MODAL = 'UPLOAD_PROGRESS_MODAL';

/* Action creators */
export const openModal = (modalKey, props = {}) => ({
  type: OPEN_MODAL,
  payload: {
    props,
    id: modalKey,
  },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
