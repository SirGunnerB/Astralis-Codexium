import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_ITEMS,
  GET_ITEM,
  ITEM_ERROR,
  UPDATE_ITEM,
  DELETE_ITEM,
} from './types';

// Get all items for a world
export const getItems = (worldId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${worldId}/items`);

    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get item by ID
export const getItem = (worldId, itemId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${worldId}/items/${itemId}`);

    dispatch({
      type: GET_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update item
export const updateItem = (worldId, itemId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/worlds/${worldId}/items/${itemId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_ITEM,
      payload: res.data,
    });

    dispatch(setAlert('Item updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete item
export const deleteItem = (worldId, itemId) => async (dispatch) => {
  try {
    await axios.delete(`/api/worlds/${worldId}/items/${itemId}`);

    dispatch({
      type: DELETE_ITEM,
      payload: itemId,
    });

    dispatch(setAlert('Item removed', 'success'));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}; 