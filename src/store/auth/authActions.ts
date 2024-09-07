import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  SET_PROFILE,
  REMOVE_PROFILE,
} from './authActionTypes';
import { User } from 'firebase/auth';

export const setAuthSuccess = (user: User) => ({
  type: AUTH_SUCCESS,
  payload: user,
});

export const setAuthFailure = () => ({
  type: AUTH_FAILURE,
});

export const setProfile = (data: User) => ({
  type: SET_PROFILE,
  payload: data,
});

export const removeProfile = () => ({
  type: REMOVE_PROFILE,
});
