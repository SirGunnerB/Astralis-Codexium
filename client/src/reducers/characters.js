import {
  GET_CHARACTERS,
  GET_CHARACTER,
  CHARACTER_ERROR,
  UPDATE_CHARACTER,
  DELETE_CHARACTER,
} from '../actions/types';

const initialState = {
  characters: [],
  currentCharacter: null,
  loading: true,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: payload,
        loading: false,
      };
    case GET_CHARACTER:
      return {
        ...state,
        currentCharacter: payload,
        loading: false,
      };
    case UPDATE_CHARACTER:
      return {
        ...state,
        characters: state.characters.map((character) =>
          character._id === payload._id ? payload : character
        ),
        currentCharacter: payload,
        loading: false,
      };
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter((character) => character._id !== payload),
        currentCharacter: null,
        loading: false,
      };
    case CHARACTER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
} 