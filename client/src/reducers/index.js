import { combineReducers } from 'redux';
import auth from './auth';
import worlds from './worlds';
import characters from './characters';
import locations from './locations';
import items from './items';
import alert from './alert';
import events from './events';

export default combineReducers({
  auth,
  worlds,
  characters,
  locations,
  items,
  alert,
  events,
}); 