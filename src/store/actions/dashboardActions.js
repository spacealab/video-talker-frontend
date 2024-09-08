// dashboardActions.js

// Existing actions
export const DASHBOARD_SET_USERNAME = 'DASHBOARD.SET_USERNAME';
export const DASHBOARD_SET_ACTIVE_USERS = 'DASHBOARD.SET_ACTIVE_USERS';

// New action for setting the local stream
export const CALL_SET_LOCAL_STREAM = 'CALL.SET_LOCAL_STREAM';

// Action creators
export const setUsername = (username) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    username
  };
};

export const setActiveUsers = (activeUsers) => {
  return {
    type: DASHBOARD_SET_ACTIVE_USERS,
    activeUsers
  };
};

// New action creator for setting local stream
export const setLocalStream = (localStream) => {
  return {
    type: CALL_SET_LOCAL_STREAM,
    localStream
  };
};