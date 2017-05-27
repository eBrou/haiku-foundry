import 'isomorphic-fetch';
import firebase from 'firebase';

// export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
// export const SIGNUP_ERROR = 'SIGNUP_ERROR';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const SAVE_HAIKU_SUCCESS = 'SAVE_HAIKU_SUCCESS';
export const SAVE_HAIKU_ERROR = 'SAVE_HAIKU_ERROR';



// action creators
// export const signUpSuccess = () => ({
//   type: SIGNUP_SUCCESS,
// });
//
// export const signUpError = (message) => ({
//   type: SIGNUP_ERROR,
//   message,
// });
//
// export const logInSuccess = () => ({
//   type: LOGIN_SUCCESS,
// });
//
// export const logInError = (message) => ({
//   type: LOGIN_ERROR,
//   message,
// });

export const signInSuccess = () => ({
  type: SIGNIN_SUCCESS,
})

export const signInError = () => ({
  type: SIGNIN_ERROR,
})

// ASync Actions

export const saveHaiku = (haiku) => {
  return (dispatch, getState) => {
    
  }
}
