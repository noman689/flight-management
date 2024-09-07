import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { AppState } from './auth/types';

const rootReducer = combineReducers<AppState>({
  app: authReducer,
});

export default rootReducer;
