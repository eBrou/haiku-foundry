// import { hashHistory } from 'react-router';
import * as actions from '../actions/index';

const initialState = {}

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.BLAH: {
      return Object.assign({}, state, {});
    }
    default:
      return state;
  }
};
