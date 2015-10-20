import Immutable from 'immutable';
const initialState = new Immutable.List();

module.exports = function(state = initialState, action) {
  if (action.type === 'SET_EXPERIMENTS') {
    return Immutable.fromJS(action.experiments);
  } else {
    return state;
  }
};
