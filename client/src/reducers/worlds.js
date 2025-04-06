import {
  GET_WORLDS,
  GET_WORLD,
  WORLD_ERROR,
  UPDATE_WORLD,
  DELETE_WORLD,
} from '../actions/types';

const initialState = {
  worlds: [],
  currentWorld: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_WORLDS:
      return {
        ...state,
        worlds: payload,
        loading: false,
      };
    case GET_WORLD:
      return {
        ...state,
        currentWorld: payload,
        loading: false,
      };
    case UPDATE_WORLD:
      return {
        ...state,
        worlds: state.worlds.map((world) =>
          world._id === payload._id ? payload : world
        ),
        currentWorld: payload,
        loading: false,
      };
    case DELETE_WORLD:
      return {
        ...state,
        worlds: state.worlds.filter((world) => world._id !== payload),
        currentWorld: null,
        loading: false,
      };
    case WORLD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
} 