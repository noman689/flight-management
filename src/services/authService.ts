import {
  removeProfile,
  setAuthFailure,
  setAuthSuccess,
  setProfile,
} from '@client/store/auth/authActions';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA3_D-7IaIIxvnEHUiXhp9-7RMpD-6emsw',
  authDomain: 'flight-users.firebaseapp.com',
  projectId: 'flight-users',
  storageBucket: 'flight-users.appspot.com',
  messagingSenderId: '573971720756',
  appId: '1:573971720756:web:947ca74abc0e0b25e17861',
  measurementId: 'G-4JBX2LRH4F',
};
// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email: string, password: string, dispatch: any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    dispatch(setAuthSuccess(user));
    dispatch(setProfile(user));

    return user;
  } catch (error) {
    console.error('Login error:', error.message);
    dispatch(setAuthFailure());
    dispatch(removeProfile());
    throw error;
  }
};

export const signup = async (
  email: string,
  password: string,
  dispatch: any,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    dispatch(setAuthSuccess(user));
    dispatch(setProfile(user));
    return user;
  } catch (error) {
    console.error('Signup error:', error.message);
    dispatch(setAuthFailure());
    dispatch(removeProfile());
    throw error;
  }
};

export const logoutUser = async (dispatch: any) => {
  try {
    await signOut(auth);
    dispatch(setAuthFailure());
    dispatch(removeProfile());
  } catch (error) {
    console.error('Logout error:', error.message);
    throw error;
  }
};

export const verifyUser = (dispatch: any) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setAuthSuccess(user));
      dispatch(setProfile(user));
    } else {
      dispatch(setAuthFailure());
      dispatch(removeProfile());
    }
  });
};
