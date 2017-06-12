import { mainReducer } from '../js/reducers/index';
import * as actions from '../js/actions/index';

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


describe('mainReducer', () => {
  const savedHaikus = [{},{},{}];

  it('Should set the initial state when nothing is passed in', () => {
    const state = mainReducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    let currentState = {};
    const state = mainReducer(currentState, {type: '__UNKNOWN'});
    expect(state).toBe(currentState);
  });

  describe('signInSuccess', () => {
    it('should add current user info', () => {
      const uid = '1234';
      const email = 'test@test.com';
      let state = {};
      state = mainReducer(state, actions.signInSuccess(email, uid));
      expect(state).toEqual({
      "email": "test@test.com",
      "userId": "1234",
      "loggedIn": true,
      "redirectTo": true,
    });
    })
  })

  describe('signInError', () => {
    it('should add Error message', () => {
      const errorEmail = "test email error";
      const errorPassword = "test password error";
      let state = {};
      state = mainReducer(state, actions.signInError(errorEmail, errorPassword));
      expect(state).toEqual({
        errorEmail: 'test email error',
        errorPassword: "test password error",
      }
      );
    })
  })

  describe('saveHaikuSuccess', () => {
    it('should set savedDialog key to true', () => {
      let state = {};
      state = mainReducer(state, actions.saveHaikuSuccess());
      expect(state).toEqual({
        savedDialog: true,
      });
    })
  })

  describe('getHaikusSuccess', () => {
    it('should set savedDialog key to true', () => {
      let state = {};
      const haikus = [{}, {}, {}]
      state = mainReducer(state, actions.getHaikusSuccess(haikus));
      expect(state).toEqual({
        savedHaikus: haikus,
      });
    })
  })

  describe('openEditHaiku', () => {
    it('should set haikuIdToEdit and haikuTextToEdit', () => {
      let state = {};
      const id = '1234';
      const text = 'blah blah blah'
      state = mainReducer(state, actions.openEditHaiku(id, text));
      expect(state).toEqual({
        haikuIdToEdit: id,
        haikuTextToEdit: text,

      });
    })
  })

  describe('saveEditHaikuSuccess', () => {
    it('should set savedDialog key to true', () => {
      let state = {};
      state = mainReducer(state, actions.saveEditHaikuSuccess());
      expect(state).toEqual({
        savedDialog: true,
      });
    })
  })

  describe('logOutSuccess', () => {
    it('should loggedIn to true and reset email', () => {
      let state = {};
      state = mainReducer(state, actions.logOutSuccess());
      expect(state).toEqual({
        loggedIn: false,
        email: null,
      });
    })
  })

  describe('resetSaveDialog', () => {
    it('should reset savedDialog to false', () => {
      let state = {};
      state = mainReducer(state, actions.resetSaveDialog());
      expect(state).toEqual({
        savedDialog: false,
      });
    })
  })

})
