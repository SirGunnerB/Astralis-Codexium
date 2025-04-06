import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_WORLDS,
  GET_WORLD,
  WORLD_ERROR,
  UPDATE_WORLD,
  DELETE_WORLD,
} from './types';

// Get all worlds
export const getWorlds = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/worlds');

    dispatch({
      type: GET_WORLDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get world by ID
export const getWorld = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${id}`);

    dispatch({
      type: GET_WORLD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update world
export const updateWorld = (id, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(`/api/worlds/${id}`, formData, config);

    dispatch({
      type: UPDATE_WORLD,
      payload: res.data,
    });

    dispatch(setAlert('World updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete world
export const deleteWorld = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/worlds/${id}`);

    dispatch({
      type: DELETE_WORLD,
      payload: id,
    });

    dispatch(setAlert('World removed', 'success'));
  } catch (err) {
    dispatch({
      type: WORLD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}; 