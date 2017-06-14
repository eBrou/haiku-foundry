import * as actions from '../actions/index';

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
  redirectTo: false,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_SUCCESS: {
      return Object.assign({}, state, {
        loggedIn: true,
        email: action.email,
        userId: action.uid,
        redirectTo: true,
      });
    }
    case actions.SIGNIN_ERROR: {
      return Object.assign({}, state, {
        errorEmail: action.errorEmail,
        errorPassword: action.errorPassword,
      });
    }
    case actions.SAVE_HAIKU_SUCCESS: {
      return Object.assign({}, state, {
        savedDialog: true,
      });
    }
    case actions.GET_HAIKUS_SUCCESS: {
      return Object.assign({}, state, {
        savedHaikus: action.haikus,
      });
    }
    case actions.OPEN_EDIT_HAIKU: {
      return Object.assign({}, state, {
        haikuIdToEdit: action.haikuId,
        haikuTextToEdit: action.haikuText,
      });
    }
    case actions.SAVE_EDIT_HAIKU_SUCCESS: {
      return Object.assign({}, state, {
        savedDialog: true,
      });
    }
    case actions.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        loggedIn: false,
        email: null,
      });
    }
    case actions.RESET_SAVE_DIALOG: {
      return Object.assign({}, state, {
        savedDialog: false,
      });
    }

    default:
      return state;
  }
};
