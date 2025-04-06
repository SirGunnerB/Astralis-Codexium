import {
  GET_ITEMS,
  GET_ITEM,
  ITEM_ERROR,
  UPDATE_ITEM,
  DELETE_ITEM,
} from '../actions/types';

const initialState = {
  items: [],
  currentItem: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false,
      };
    case GET_ITEM:
      return {
        ...state,
        currentItem: payload,
        loading: false,
      };
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === payload._id ? payload : item
        ),
        currentItem: payload,
        loading: false,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== payload),
        currentItem: null,
        loading: false,
      };
    case ITEM_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
} 