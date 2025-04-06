import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => (dispatch) => {
  const id = Math.random().toString(36).substr(2, 9);
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
}; 