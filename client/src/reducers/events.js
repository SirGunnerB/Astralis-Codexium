import {
  GET_EVENTS,
  EVENT_ERROR,
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from '../actions/types';

const initialState = {
  events: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false,
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
        loading: false,
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === payload._id ? payload : event
        ),
        loading: false,
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== payload),
        loading: false,
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
} 