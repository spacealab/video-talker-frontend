import { callStates, setCallRejected, setLocalCameraEnabled, setLocalMicrophoneEnabled, setMessage } from '../../../store/actions/callActions';

import CallRejectedDialog from '../CallRejectedDialog/CallRejectedDialog';
import CallingDialog from '../CallingDialog/CallingDialog';
import ConversationButtons from '../ConversationButtons/ConversationButtons';
import IncomingCallDialog from '../IncomingCallDialog/IncomingCallDialog';
import LocalVideoView from '../LocalVideoView/LocalVideoView';
import Messenger from '../Messenger/Messenger';
import React from 'react';
import RemoteVideoView from '../RemoteVideoView/RemoteVideoView';
import { connect } from 'react-redux';

const DirectCall = (props) => {
  const {
    localStream,
    remoteStream,
    callState,
    callerUsername,
    callingDialogVisible,
    callRejected,
    hideCallRejectedDialog,
    setDirectCallMessage,
    message
  } = props;

  return (
    <>
      <LocalVideoView localStream={localStream} />
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <RemoteVideoView remoteStream={remoteStream} />}
      {callRejected.rejected && <CallRejectedDialog
        reason={callRejected.reason}
        hideCallRejectedDialog={hideCallRejectedDialog}
                                />}
      {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
      {callingDialogVisible && <CallingDialog />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <ConversationButtons {...props} />}
      {remoteStream && callState === callStates.CALL_IN_PROGRESS && <Messenger message={message} setDirectCallMessage={setDirectCallMessage} />}
    </>
  );
};

function mapStoreStateToProps ({ call }) {
  return {
    ...call
  };
}

function mapDispatchToProps (dispatch) {
  return {
    hideCallRejectedDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails)),
    setCameraEnabled: (enabled) => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: (enabled) => dispatch(setLocalMicrophoneEnabled(enabled)),
    setDirectCallMessage: (received, content) => dispatch(setMessage(received, content))
  };
}

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);