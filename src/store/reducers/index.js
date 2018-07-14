import {combineReducers} from 'redux';
import notifications from 'store/reducers/notifications';
import balance from 'store/reducers/balance';
import movies from 'store/reducers/movies';

export default combineReducers({
  notifications,
  balance,
  movies
})