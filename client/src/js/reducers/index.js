// import { hashHistory } from 'react-router';
import * as actions from '../actions/index';
import firebase from 'firebase';


const errorMessageGen = (errorCode) => {
  switch (errorCode) {
    case "auth/wrong-password":
      return "Invalid password";
    case "auth/user-not-found":
      return "User not found";
    case "auth/invalid-email":
      return "Invalid email";

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
      // console.log('signInSuccess triggered')
      const user = firebase.auth().currentUser
      // console.log(user);
        return Object.assign({}, state, {
          loggedIn: true,
          email: user.email,
          userId: user.uid,
          redirectTo: true,
      })
    }
    case actions.SIGNIN_ERROR: {
      console.log("SIGNIN_ERROR triggered")
      // console.logaction.erroMessage.code
      const errorCode = action.errorMessage.code
      // check to see if error from password so it can be directed to password error line
      let errorEmail;
      let errorPassword
      if(errorCode === 'auth/wrong-password'){
        errorPassword = errorMessageGen(errorCode);
        errorEmail = null;
      }
      else {
        errorEmail = errorMessageGen(errorCode);
        errorPassword = null;
      }


      return Object.assign({}, state, {
        errorEmail: errorEmail,
        errorPassword: errorPassword,
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
      console.log('reset save dialog happened');
      return Object.assign({}, state, {
        savedDialog: false,
       })
    }

    default:
      return state;
  }
};
