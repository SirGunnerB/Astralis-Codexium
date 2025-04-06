import {
  GET_LOCATIONS,
  GET_LOCATION,
  LOCATION_ERROR,
  UPDATE_LOCATION,
  DELETE_LOCATION,
} from '../actions/types';

const initialState = {
  locations: [],
  currentLocation: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: payload,
        loading: false,
      };
    case GET_LOCATION:
      return {
        ...state,
        currentLocation: payload,
        loading: false,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) =>
          location._id === payload._id ? payload : location
        ),
        currentLocation: payload,
        loading: false,
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter((location) => location._id !== payload),
        currentLocation: null,
        loading: false,
      };
    case LOCATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
} 