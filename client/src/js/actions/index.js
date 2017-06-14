import 'isomorphic-fetch';
import firebase from 'firebase';

export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'SIGNIN_ERROR';
export const SAVE_HAIKU_SUCCESS = 'SAVE_HAIKU_SUCCESS';
export const SAVE_HAIKU_ERROR = 'SAVE_HAIKU_ERROR';
export const GET_HAIKUS_SUCCESS = 'GET_HAIKUS_SUCCESS';
export const GET_HAIKUS_ERROR = 'GET_HAIKUS_ERROR';
export const OPEN_EDIT_HAIKU = 'OPEN_EDIT_HAIKU';
export const SAVE_EDIT_HAIKU_SUCCESS = 'SAVE_EDIT_HAIKU_SUCCESS';
export const SAVE_EDIT_HAIKU_ERROR = 'SAVE_EDIT_HAIKU_ERROR';
export const DELETE_HAIKU_SUCCESS = 'DELETE_HAIKU_SUCCESS';
export const DELETE_HAIKU_ERROR = 'DELETE_HAIKU_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';
export const RESET_SAVE_DIALOG = 'RESET_SAVE_DIALOG';

// action creators
export const signInSuccess = (email, uid) => ({
  type: SIGNIN_SUCCESS,
  email,
  uid,
});

export const signInError = (errorEmail, errorPassword) => ({
  type: SIGNIN_ERROR,
  errorEmail,
  errorPassword,
});

export const saveHaikuSuccess = () => ({
  type: SAVE_HAIKU_SUCCESS,
});

export const saveHaikuError = errorMessage => ({
  type: SAVE_HAIKU_ERROR,
  errorMessage,
});

export const getHaikusSuccess = haikus => ({
  type: GET_HAIKUS_SUCCESS,
  haikus,
});

export const getHaikusError = errorMessage => ({
  type: GET_HAIKUS_ERROR,
  errorMessage,
});

export const openEditHaiku = (haikuId, haikuText) => ({
  type: OPEN_EDIT_HAIKU,
  haikuId,
  haikuText,
});

export const saveEditHaikuSuccess = () => ({
  type: SAVE_EDIT_HAIKU_SUCCESS,
});

export const saveEditHaikuError = errorMessage => ({
  type: SAVE_EDIT_HAIKU_ERROR,
  errorMessage,
});

export const deleteHaikuSuccess = () => ({
  type: DELETE_HAIKU_SUCCESS,
});

export const deleteHaikuError = errorMessage => ({
  type: DELETE_HAIKU_ERROR,
  errorMessage,
});

export const logOutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logOutError = errorMessage => ({
  type: LOGOUT_ERROR,
  errorMessage,
});

export const resetSaveDialog = () => ({
  type: RESET_SAVE_DIALOG,
});

// helper function to generate custom error messages from firebase
const errorMessageGen = (errorCode) => {
  switch (errorCode) {
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/user-not-found':
      return 'User not found';
    case 'auth/invalid-email':
      return 'Invalid email';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    default:
      return null;
  }
};

// ASync Actions

// Login a user

export const logInUser = (email, password) => (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      const userObj = firebase.auth().currentUser;
      const uid = userObj.uid;
      const email2 = userObj.email;
      dispatch(signInSuccess(email, uid));
    })
    .catch((error) => {
      let errorEmail;
      let errorPassword;
      if (error.code === 'auth/wrong-password') {
        errorPassword = errorMessageGen(error.code);
        errorEmail = null;
      } else {
        errorEmail = errorMessageGen(error.code);
        errorPassword = null;
      }
      dispatch(signInError(errorEmail, errorPassword));
    });
};


export const signUpUser = (email, password) => (dispatch) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => dispatch(signInSuccess()))
    .catch(error => dispatch(signInError(error)));
};


// Log Out a user
export const logOutUser = () => (dispatch) => {
  firebase.auth().signOut()
    .then(() => dispatch(logOutSuccess()));
};


// Get User's Haikus for Sidebar
export const getHaikus = userId => dispatch =>
     fetch(`/api/haikus/${userId}`)
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(response => response.json())
    .then((haikus) => {
      dispatch(getHaikusSuccess(haikus));
    })
    .catch(error => dispatch(getHaikusError(error)));


// Save a Haiku
export const saveHaiku = (haiku, userId) => (dispatch) => {
  const date = new Date().toString();
  const haikuObj = {
    haikuText: haiku,
    userId,
    date,
  };
    // return fetch('//localhost:3001/api/haikus',
  return fetch('/api/haikus',
    { method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(haikuObj),
    })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    }).then(() => {
      dispatch(saveHaikuSuccess());
    // make sure latest edit to haiku updated in state
      dispatch(getHaikus());
    })
    .catch(() => dispatch(saveHaikuError));
};

// Edit a Haiku
export const saveEditHaiku = (haikuText, haikuId) => (dispatch) => {
  const date = new Date().toString();
  return fetch(`/api/haikus/${haikuId}`,
    {
      method: 'PUT',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(
        { haikuText,
          date,
        }),
    })
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(() => {
      dispatch(saveEditHaikuSuccess());
      // make sure latest edit to haiku updated in state
      dispatch(getHaikus());
    })
    .catch(() => dispatch(saveEditHaikuError));
};

// Delete a Haiku
export const deleteHaiku = haikuId => dispatch =>
     fetch(`/api/haikus/${haikuId}`,
       {
         method: 'DELETE',
         headers: new Headers({
           'Content-Type': 'application/json',
         }),
       },
    )
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(() => {
      dispatch(deleteHaikuSuccess());
      // make sure latest edit to haiku updated in state
      dispatch(getHaikus());
    })
    .catch(() => dispatch(deleteHaikuError()));
