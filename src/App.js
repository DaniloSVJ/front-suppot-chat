import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import avatar from './4792929.png';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [blockSide, setblockSide] = useState([]);

  const [messagesSide, setMessagesSide] = useState([]);
  const [clients, setClients] = useState([]);
  const [currentClientId, setCurrentClientId] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { room: 'support' });

    socket.on('newClient', (data) => {
      setClients((prevClients) => [...prevClients, data.clientId]);
    });
    


    socket.on('supportMessage', (data) => {

      const msgSide = {
        id: data.id,
        message: data.message
      }; 
      
      setMessages((prevMessages) => [...prevMessages, msgSide]);
      
    });

    return () => {
      socket.off('newClient');
      socket.off('supportMessage');
    };

  }, []);

  const selectClient = (clientId) => {
    setCurrentClientId(clientId);
    setMessages([]);
  };

  const sendMessage = () => {
    
    if (message && currentClientId) {
     
      socket.emit('supportMessage', { clientId: currentClientId, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Support</h1>
      <div id="clients">
        {clients.map((clientId, index) => (
          <div
            style={{marginRight:'20px',height:'100px',width:'200px', color:'#fff', backgroundColor: 'blue', cursor: 'pointer'}}
            key={index} onClick={() => selectClient(clientId)}>
            Client ID: {clientId}
          </div>
        ))}
      </div>
      <div id="messages">
        {messages.map((msg, index) => (
          <div>
            <p key={index}>{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        id="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
