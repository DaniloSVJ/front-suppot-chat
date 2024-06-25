import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function SupportApp() {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    socket.emit('supportJoin'); // Suporte se junta à sala de suporte

    socket.on('message', (message) => {
   
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);
  socket.on('message', (message) => {
    console.log(message)
    setMessages((prevMessages) => [...prevMessages, message]);
  });
  const sendMessage = () => {
    if (response && currentUser) {
  
      socket.emit('msgtoSuport', { username: currentUser, text: response });
      setResponse('');
    }
  };

  return (
    <div>
      <h1>Support Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{msg.username}</strong>: {msg.message}
            <div>
              <input 
                type="text" 
                placeholder="Type your response" 
                value={response} 
                onChange={(e) => setResponse(e.target.value)} 
              />
              <button onClick={() => { setCurrentUser(msg.username); sendMessage(); }}>Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SupportApp;
