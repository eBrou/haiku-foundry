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
export const GET_HAIKUS_SUCCESS = 'GET_HAIKUS_SUCCESS';
export const GET_HAIKUS_ERROR = 'GET_HAIKUS_ERROR';
export const OPEN_EDIT_HAIKU = 'OPEN_EDIT_HAIKU';
export const SAVE_EDIT_HAIKU_SUCCESS = 'SAVE_EDIT_HAIKU_SUCCESS';
export const SAVE_EDIT_HAIKU_ERROR = 'SAVE_EDIT_HAIKU_ERROR';
export const DELETE_HAIKU_SUCCESS = 'DELETE_HAIKU_SUCCESS';
export const DELETE_HAIKU_ERROR = 'DELETE_HAIKU_ERROR';

// action creators
export const signInSuccess = () => ({
  type: SIGNIN_SUCCESS,
})

export const signInError = (errorMessage) => ({
  type: SIGNIN_ERROR,
  errorMessage
})

export const saveHaikuSuccess = () => ({
  type: SAVE_HAIKU_SUCCESS,
});

export const saveHaikuError = (message) => ({
  type: SAVE_HAIKU_ERROR,
  message,
});

export const getHaikusSuccess = (haikus) => ({
  type: GET_HAIKUS_SUCCESS,
  haikus
});

export const getHaikusError = () => ({
  type: GET_HAIKUS_ERROR,
});

export const openEditHaiku = (haikuId, haikuText) => ({
  type: OPEN_EDIT_HAIKU,
  haikuId,
  haikuText
});

export const saveEditHaikuSuccess = () => ({
  type: SAVE_EDIT_HAIKU_SUCCESS,
});

export const saveEditHaikuError = (message) => ({
  type: SAVE_EDIT_HAIKU_ERROR,
  message,
});

export const deleteHaikuSuccess = () => ({
  type: DELETE_HAIKU_SUCCESS,
});

export const deleteHaikuError = (message) => ({
  type: DELETE_HAIKU_ERROR,
  message,
});



// ASync Actions
// Get User's Haikus for Sidebar
export const getHaikus = () => {
  return (dispatch, getState) => {
    const userId = getState().userId;
    console.log('userId is ' + userId)
    return fetch(`//localhost:3001/api/haikus/${userId}`)
    .then((response) => {
      if (!response.ok) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response;
    })
    .then(response => response.json())
    // .then(response => {
    //   // console.log(response.json())
    //   response.json()
    // })
    .then((haikus) => {
      dispatch(getHaikusSuccess(haikus))
    })
    .catch(() => dispatch(getHaikusError()));
  }
}


// Save a Haiku
export const saveHaiku = (haiku) => {
  return (dispatch, getState) => {
    const userId = getState().userId;
    const date = new Date().toString();
    const haikuObj = {
      haikuText: haiku,
      userId: userId,
      date: date
    }
    // console.log(haikuObj)
    return fetch('//localhost:3001/api/haikus',
      { method: "POST",
        mode: 'cors',
        headers: new Headers({
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
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
  }
}

// Edit a Haiku
export const saveEditHaiku = (haikuText) => {
  return (dispatch, getState) => {
    const haikuId = getState().haikuIdToEdit;
    const date = new Date();
    return fetch(`//localhost:3001/api/haikus/${haikuId}`,
      {
        method: 'PUT',
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(
          {haikuText: haikuText,
           date: date
          })
      })

    .then((response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    return response;})
    .then((haiku) => {
      const haikuText = haiku.haikuText;
      dispatch(saveEditHaikuSuccess());
      // make sure latest edit to haiku updated in state
      dispatch(getHaikus());
    })
    .catch(() => dispatch(saveEditHaikuError));
  }
}

// Delete a Haiku
export const deleteHaiku = (haikuId) => {
  return (dispatch, getState) => {
    return fetch(`//localhost:3001/api/haikus/${haikuId}`,
      {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
    )
    .then((response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    return response;})
    .then(() => {
      // dispatch(deleteHaikuSuccess());
      // make sure latest edit to haiku updated in state
      dispatch(getHaikus());
    })
    .catch(() => dispatch(deleteHaikuError()));
  }
}
