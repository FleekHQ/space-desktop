import uniqBy from 'lodash/uniqBy';

const DEFAULT_STATE = {
  error: null,
  objects: [],
  loading: false,
  searchTerm: '',
  buckets: {
    error: null,
    isLoading: false,
  },
};

export const ADD_OBJECT = 'ADD_OBJECT';
export const STORE_OBJECTS = 'STORE_OBJECTS';
export const DELETE_OBJECT = 'DELETE_OBJECT';
export const UPDATE_OBJECT = 'UPDATE_OBJECT';
export const SET_ERROR_STATE = 'SET_ERROR_STATE';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SEARCH_TERM_CHANGE = 'SEARCH_TERM_CHANGE';

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_TERM_CHANGE: {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    case STORE_OBJECTS: {
      const objects = uniqBy([
        ...action.payload,
      ], 'fullKey');

      return {
        ...state,
        objects,
        loading: false,
      };
    }

    case SET_LOADING_STATE: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_ERROR_STATE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case ADD_OBJECT: {
      const objects = [
        action.payload,
        ...state.objects,
      ];

      return {
        ...state,
        objects: uniqBy(objects, 'fullKey'),
        loading: false,
      };
    }

    case DELETE_OBJECT: {
      return {
        ...state,
        objects: state.objects.filter(
          (obj) => obj.fullKey !== action.payload.fullKey,
        ),
      };
    }

    case UPDATE_OBJECT: {
      return {
        ...state,
        objects: state.objects.map((obj) => {
          if (obj.fullKey === action.payload.fullKey) return action.payload;
          return obj;
        }),
      };
    }

    default:
      return state;
  }
};
