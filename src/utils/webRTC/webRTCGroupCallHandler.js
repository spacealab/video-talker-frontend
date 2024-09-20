import * as wss from '../wssConnection/wssConnection';

import { callStates, clearGroupCallData, setCallState, setGroupCallActive, setGroupCallIncomingStreams } from '../../store/actions/callActions';

import store from '../../store/store';

let myPeer;
let myPeerId;
let groupCallHost = false;
let groupCallRoomId;

export const connectWithMyPeer = () => {
  myPeer = new window.Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '5000'
  });

  myPeer.on('open', (id) => {
    console.log('succesfully connected with peer server');
    myPeerId = id;
  });

  myPeer.on('call', call => {
    call.answer(store.getState().call.localStream);
    call.on('stream', incomingStream => {
      const Streams = store.getState().call.groupCallStreams;
      const stream = Streams.find(stream => stream.id === incomingStream.id)
      
      if (!stream) {
        addVideoStream(incomingStream);
      }    });
  });
};

export const createNewGroupCall = () => {
  groupCallHost = true;
  wss.registerGroupCall({
    username: store.getState().dashboard.username,
    peerId: myPeerId
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
}
;

export const joinGroupCall = (hostSocketId, roomId) => {
  const localStream = store.getState().call.localStream;
  groupCallRoomId = roomId; 
  wss.userWantsToJoinGroupCall({
    peerId: myPeerId,
    hostSocketId,
    roomId,
    localStreamId: localStream.id
  });

  store.dispatch(setGroupCallActive(true));
  store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const  connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;

  const call = myPeer.call(data.peerID, localStream);

  call.on('stream', (incomingStream) => {
    const Streams = store.getState().call.groupCallStreams;
    const stream = Streams.find(stream => stream.id === incomingStream.id)
    
    if (!stream) {
      addVideoStream(incomingStream);
    }
  });
};

export const leaveGroupCall = () => {
  if (groupCallHost) {
    wss.groupCallCloseByHost({
      peerId: myPeerId
    });
  } else {
    wss.userLeftGroupCall({
      streamId: store.getState().call.localStream.id,
      roomId: groupCallRoomId
    });
  }
  clearGroupData();
};

export const clearGroupData = () => {
  groupCallRoomId = null;
  store.dispatch(clearGroupCallData());
  myPeer.destroy();
  connectWithMyPeer();

  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true
  localStream.getAudioTracks()[0].enabled = true
}

export const removeInactiveStream = (data) => {
  const groupCallStreams = store.getState().call.groupCallStreams.filter(
    stream => stream.id !== data.streamId
  );
  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
}

const addVideoStream = (incomingStream) => {
  const groupCallStreams = [
    ...store.getState().call.groupCallStreams,
    incomingStream
  ];

  store.dispatch(setGroupCallIncomingStreams(groupCallStreams));
};

export const checkActiveGroupCall = () => {
  if (store.getState().call.groupCallActive) {
    return groupCallRoomId;
  } else {
    return false;
  }
};

