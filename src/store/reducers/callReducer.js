import { CALL_SET_LOCAL_STREAM } from '../actions/dashboardActions';
import * as callActions from '../actions/callActions'

const initState = {
  localStream: null,
  callState: callActions.callStates.CALL_UNAVAILABLE
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case CALL_SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream
      };
    case callActions.CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState
      }

    default:
      return state;
  }
};

export default reducer;