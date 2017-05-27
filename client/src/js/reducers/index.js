// import { hashHistory } from 'react-router';
import * as actions from '../actions/index';
import firebase from 'firebase';

const initialState = {
  loginErrorMessage: 'test',
  userId: '',
  email: '',
  tester: 'test'
}

export const mainReducer = (state = initialState, action) => {

  switch (action.type) {
    // case actions.SIGNUP_SUCCESS: {
    //   console.log("SIGNUP_SUCCESS triggered")
    //   return Object.assign({}, state, {
    //   });
    // }
    // case actions.SIGNUP_ERROR: {
    //   console.log("SIGNUP_ERROR triggered")
    //   return Object.assign({}, state, {
    //     loginErrorMessage: "there is a signup error"
    //   });
    // }
    // case actions.LOGIN_SUCCESS: {
    //   console.log(SignInSuccess)
    //   return Object.assign({}, state, {
    //   });
    // }
    // case actions.LOGIN_ERROR: {
    //   return Object.assign({}, state, {
    //     loginErrorMessage: "there is a login error"
    //   });
    // }
    case actions.SIGNIN_SUCCESS: {
      console.log('signInSuccess triggered')
      // let user;
      // return new Promise((resolve) => {
      //   resolve(user = firebase.auth().currentUser)
      // })

      // .then(() => {
      //   console.log('.then triggered')
      //   console.log(user);
      const user = firebase.auth().currentUser
      console.log(user);
        return Object.assign({}, state, {
          email: user.email,
          userId: user.uid,
          tester: "blah"
      //   });
      })



      // var user = firebase.auth().currentUser;
      // console.log(user)
      // let userId = '';
      // let email = '';
      // console.log(email)
      // console.log(userId)


    }
    default:
      return state;
  }
};
