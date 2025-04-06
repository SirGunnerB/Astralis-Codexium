import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_EVENTS,
  EVENT_ERROR,
  ADD_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
} from './types';

// Get all events for a world
export const getEvents = (worldId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/worlds/${worldId}/events`);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add an event
export const createEvent = (worldId, formData) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/worlds/${worldId}/events`, formData);
    dispatch({
      type: ADD_EVENT,
      payload: res.data,
    });
    dispatch(setAlert('Event created successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update an event
export const updateEvent = (worldId, eventId, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/worlds/${worldId}/events/${eventId}`, formData);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data,
    });
    dispatch(setAlert('Event updated successfully', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete an event
export const deleteEvent = (worldId, eventId) => async (dispatch) => {
  try {
    await axios.delete(`/api/worlds/${worldId}/events/${eventId}`);
    dispatch({
      type: DELETE_EVENT,
      payload: eventId,
    });
    dispatch(setAlert('Event deleted successfully', 'success'));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}; 