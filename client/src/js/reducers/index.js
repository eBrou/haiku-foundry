// import { hashHistory } from 'react-router';
import * as actions from '../actions/index';
import firebase from 'firebase';

const initialState = {
  loggedIn: false,
  loginErrorMessage: 'test',
  userId: null,
  email: null,
  savedHaikus: [],
  haikuIdToEdit: null,
  haikuTextToEdit: null,
  errors: null,
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
          tester: "blah",
      })
    }
    case actions.SIGNIN_ERROR: {
      console.log("SIGNUP_ERROR triggered")
      console.log(action.errorMessage)
      return Object.assign({}, state, {
        errors: action.errorMessage
      });
    }
    case actions.SAVE_HAIKU_SUCCESS: {
      // console.log("SAVE_HAIKU_SUCCESS triggered")
      return Object.assign({}, state, {
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
      })
    }
    case actions.LOGOUT_SUCCESS: {
      console.log('logout success happened');
      return Object.assign({}, state, {
        loggedIn: false,
        email: null,
       })
    }

    default:
      return state;
  }
};
