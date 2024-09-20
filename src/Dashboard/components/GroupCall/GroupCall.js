import * as webRTCGroupCallHandler from '../../../utils/webRTC/webRTCGroupCallHandler';

import { callStates, setLocalCameraEnabled, setLocalMicrophoneEnabled } from '../../../store/actions/callActions';

import GroupCallButton from '../GroupCallButton/GroupCallButton';
import GroupCallRoom from '../GroupCallRoom/GroupCallRoom';
import React from 'react';
import { connect } from 'react-redux';

const GroupCall = (props) => {
  const { callState, localStream, groupCallActive, groupCallStreams } = props;

  const createRoom = () => {
    webRTCGroupCallHandler.createNewGroupCall();
  };

  const leaveRoom = () => {
    webRTCGroupCallHandler.leaveGroupCall();
  };

  return (
    <>
      {!groupCallActive && localStream && callState !== callStates.CALL_IN_PROGRESS &&
        <GroupCallButton onClickHandler={createRoom} label='Create room' />}
      {groupCallActive && <GroupCallRoom {...props} />}
      {groupCallActive && <GroupCallButton onClickHandler={leaveRoom} label='leave room' />}
    </>
  );
};

const mapStoreStateToProps = ({ call }) => ({
  ...call
});

const mapActionsToProps = (dispatch) => {
  return {
    setLocalCameraEnabled: enabled => dispatch(setLocalCameraEnabled(enabled)),
    setMicrophoneEnabled: enabled => dispatch(setLocalMicrophoneEnabled(enabled))

  }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(GroupCall);