import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SET_PROFILE,
  REMOVE_PROFILE,
} from './authActionTypes';
import { AuthState } from './types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: {},
  users: [],
};

const authReducer = (
  state: AuthState = initialState,
  action: any,
): AuthState => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, isAuthenticated: true };
    case AUTH_FAILURE:
      return { ...state, isAuthenticated: false, user: {} };
    case SET_PROFILE:
      return { ...state, user: action.payload };
    case REMOVE_PROFILE:
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default authReducer;
