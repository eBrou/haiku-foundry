// import { hashHistory } from 'react-router';
import * as actions from '../actions/index';
import firebase from 'firebase';


// helper function to generate custom error messages from firebase
const errorMessageGen = (errorCode) => {
  switch (errorCode) {
    case "auth/wrong-password":
      return "Invalid password";
    case "auth/user-not-found":
      return "User not found";
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/email-already-in-use":
        return "Email already in use"
    default:
      return null;
  }
}


const initialState = {
  loggedIn: false,
  loginErrorMessage: 'test',
  userId: null,
  email: null,
  savedHaikus: [],
  haikuIdToEdit: null,
  haikuTextToEdit: null,
  errorEmail: null,
  errorPassword: null,
  savedDialog: false,
  redirectTo: false
}

export const mainReducer = (state = initialState, action) => {

  switch (action.type) {
    case actions.SIGNIN_SUCCESS: {
      // console.log(action.email, action.uid)
      // const user = firebase.auth().currentUser
      // const user = action.userObj
      // console.log(user);
      return Object.assign({}, state, {
        loggedIn: true,
        email: action.email,
        userId: action.uid,
        redirectTo: true,
      })
    }
    case actions.SIGNIN_ERROR: {
      return Object.assign({}, state, {
        errorEmail: action.errorEmail,
        errorPassword: action.errorPassword,
      });
    }
    case actions.SAVE_HAIKU_SUCCESS: {
      // console.log("SAVE_HAIKU_SUCCESS triggered")
      return Object.assign({}, state, {
        savedDialog: true
      });
    }
    case actions.GET_HAIKUS_SUCCESS: {
      // console.log("hello")
      // console.log(action.haikus);
      return Object.assign({}, state, {
        savedHaikus: action.haikus
      });
    }
    case actions.OPEN_EDIT_HAIKU: {
      // console.log('edit haiku triggered');
      return Object.assign({}, state, {
        haikuIdToEdit: action.haikuId,
        haikuTextToEdit: action.haikuText
      })
    }
    //does this need to be here? (no state change)
    case actions.SAVE_EDIT_HAIKU_SUCCESS: {
      // console.log('save edit haiku triggered');
      return Object.assign({}, state, {
        savedDialog: true
      })
    }
    case actions.LOGOUT_SUCCESS: {
      // console.log('logout success happened');
      return Object.assign({}, state, {
        loggedIn: false,
        email: null,
       })
    }
    case actions.RESET_SAVE_DIALOG: {
      // console.log('reset save dialog happened');
      return Object.assign({}, state, {
        savedDialog: false,
       })
    }

    default:
      return state;
  }
};
