import { expect } from 'chai';
import * as actions from '../js/actions/index';

describe('signInSuccess', () => {
  it('Should return the action', () => {
    const email = 'test@test.com';
    const uid = '1234';
    const action = actions.signInSuccess(email, uid);
    expect(action.type).to.equal(actions.SIGNIN_SUCCESS);
    expect(action.email).to.equal(email);
    expect(action.uid).to.equal(uid);
  });
});

describe('signInError', () => {
  it('Should return the action', () => {
    const errorEmail = 'test email error';
    const errorPassword = 'test password error';
    const action = actions.signInError(errorEmail, errorPassword);
    expect(action.type).to.equal(actions.SIGNIN_ERROR);
    expect(action.errorEmail).to.equal(errorEmail);
    expect(action.errorPassword).to.equal(errorPassword);
  });
});

describe('saveHaikuSuccess', () => {
  it('Should return the action', () => {
    const action = actions.saveHaikuSuccess();
    expect(action.type).to.equal(actions.SAVE_HAIKU_SUCCESS);
  });
});

describe('saveHaikuError', () => {
  it('Should return the action', () => {
    const errorMessage = 'test';
    const action = actions.saveHaikuError(errorMessage);
    expect(action.type).to.equal(actions.SAVE_HAIKU_ERROR);
    expect(action.errorMessage).to.equal(errorMessage);
  });
});

describe('getHaikusSuccess', () => {
  it('Should return the action', () => {
    const haikus = { test: 'test' };
    const action = actions.getHaikusSuccess(haikus);
    expect(action.type).to.equal(actions.GET_HAIKUS_SUCCESS);
    expect(action.haikus).to.equal(haikus);
  });
});

describe('getHaikusError', () => {
  it('Should return the action', () => {
    const errorMessage = 'test';
    const action = actions.getHaikusError(errorMessage);
    expect(action.type).to.equal(actions.GET_HAIKUS_ERROR);
    expect(action.errorMessage).to.equal(errorMessage);
  });
});

describe('openEditHaiku', () => {
  it('Should return the action', () => {
    const haikuId = '12345';
    const haikuText = 'testtesttest';
    const action = actions.openEditHaiku(haikuId, haikuText);
    expect(action.type).to.equal(actions.OPEN_EDIT_HAIKU);
    expect(action.haikuId).to.equal(haikuId);
    expect(action.haikuText).to.equal(haikuText);
  });
});

describe('saveEditHaikuSuccess', () => {
  it('Should return the action', () => {
    const action = actions.saveEditHaikuSuccess();
    expect(action.type).to.equal(actions.SAVE_EDIT_HAIKU_SUCCESS);
  });
});

describe('saveEditHaikuError', () => {
  it('Should return the action', () => {
    const errorMessage = 'test';
    const action = actions.saveEditHaikuError(errorMessage);
    expect(action.type).to.equal(actions.SAVE_EDIT_HAIKU_ERROR);
    expect(action.errorMessage).to.equal(errorMessage);
  });
});

describe('deleteHaikuSuccess', () => {
  it('Should return the action', () => {
    const action = actions.deleteHaikuSuccess();
    expect(action.type).to.equal(actions.DELETE_HAIKU_SUCCESS);
  });
});

describe('deleteHaikuError', () => {
  it('Should return the action', () => {
    const errorMessage = 'test'
    const action = actions.deleteHaikuError(errorMessage);
    expect(action.type).to.equal(actions.DELETE_HAIKU_ERROR);
    expect(action.errorMessage).to.equal(errorMessage);
  });
});

describe('logOutSuccess', () => {
  it('Should return the action', () => {
    const action = actions.logOutSuccess();
    expect(action.type).to.equal(actions.LOGOUT_SUCCESS);
  });
});

describe('logOutError', () => {
  it('Should return the action', () => {
    const errorMessage = 'test';
    const action = actions.logOutError(errorMessage);
    expect(action.type).to.equal(actions.LOGOUT_ERROR);
    expect(action.errorMessage).to.equal(errorMessage);
  });
});

describe('resetSaveDialog', () => {
  it('Should return the action', () => {
    const action = actions.resetSaveDialog();
    expect(action.type).to.equal(actions.RESET_SAVE_DIALOG);
  });
});
