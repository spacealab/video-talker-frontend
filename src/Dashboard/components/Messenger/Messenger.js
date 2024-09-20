import './Messenger.css';

import React, { useEffect, useState } from 'react';

import MessageDisplayer from './MessageDisplayer';
import { sendMessageUsingDataChannel } from '../../../utils/webRTC/webRTCHandler';

const Messenger = ({ message, setDirectCallMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleOnKeyDownEvent = (e) => {
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    if (message.received) {
      const timeoutId = setTimeout(() => {
        setDirectCallMessage(false, '');
      }, 3000);

      // Clean up the timeout on component unmount or when message.received changes
      return () => clearTimeout(timeoutId);
    }
  }, [message.received, setDirectCallMessage]);

  return (
    <>
      <input
        className='messages_input'
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleOnKeyDownEvent}
        placeholder='Type your message'
      />
      {message.received && <MessageDisplayer message={message.content} />}
    </>
  );
};

export default Messenger;