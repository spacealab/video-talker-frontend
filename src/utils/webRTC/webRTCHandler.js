import { setLocalStream, setCallState, callStates } from "../../store/actions/callActions";
import store from '../../store/store';

const defaultConstraints = { // Corrected the typo here
    video: true,
    audio: true
};

export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(defaultConstraints) // Use the corrected variable name
        .then(stream => {
            store.dispatch(setLocalStream(stream)); // Use store instead of StorageEvent
            store.dispatch(setCallState(callStates.CALL_AVAILABLE));
        })
        .catch(err => {
            console.log('Error occurred when trying to get access to the local stream');
            console.log(err);
        });
};