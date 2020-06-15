import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '@shared/components/Modal/actions';

const defaultState = {
  id: null,
  open: false,
  props: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...action.payload,
        open: true,
      };

    case CLOSE_MODAL:
      return defaultState;

    default:
      return state;
  }
};
