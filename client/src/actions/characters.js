import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CHARACTERS,
  GET_CHARACTER,
  CHARACTER_ERROR,
  UPDATE_CHARACTER,
  DELETE_CHARACTER,
} from './types';

// Get all characters for a world
export const getCharacters = (worldId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${worldId}/characters`);

    dispatch({
      type: GET_CHARACTERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get character by ID
export const getCharacter = (worldId, characterId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${worldId}/characters/${characterId}`);

    dispatch({
      type: GET_CHARACTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update character
export const updateCharacter = (worldId, characterId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/worlds/${worldId}/characters/${characterId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_CHARACTER,
      payload: res.data,
    });

    dispatch(setAlert('Character updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete character
export const deleteCharacter = (worldId, characterId) => async (dispatch) => {
  try {
    await axios.delete(`/api/worlds/${worldId}/characters/${characterId}`);

    dispatch({
      type: DELETE_CHARACTER,
      payload: characterId,
    });

    dispatch(setAlert('Character removed', 'success'));
  } catch (err) {
    dispatch({
      type: CHARACTER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}; 