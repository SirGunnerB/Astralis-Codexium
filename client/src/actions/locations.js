import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_LOCATIONS,
  GET_LOCATION,
  LOCATION_ERROR,
  UPDATE_LOCATION,
  DELETE_LOCATION,
} from './types';

// Get all locations for a world
export const getLocations = (worldId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${worldId}/locations`);

    dispatch({
      type: GET_LOCATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get location by ID
export const getLocation = (worldId, locationId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${worldId}/locations/${locationId}`);

    dispatch({
      type: GET_LOCATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update location
export const updateLocation = (worldId, locationId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/worlds/${worldId}/locations/${locationId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_LOCATION,
      payload: res.data,
    });

    dispatch(setAlert('Location updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete location
export const deleteLocation = (worldId, locationId) => async (dispatch) => {
  try {
    await axios.delete(`/api/worlds/${worldId}/locations/${locationId}`);

    dispatch({
      type: DELETE_LOCATION,
      payload: locationId,
    });

    dispatch(setAlert('Location removed', 'success'));
  } catch (err) {
    dispatch({
      type: LOCATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}; 