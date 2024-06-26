import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import avatar from './4792929.png';

const socket = io('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [response, setResponse] = useState('');
  const [selectedAdminId, setSelectedAdminId] = useState(null);



  useEffect(() => {
    socket.emit('joinRoom', { room: 'support' });

    socket.on('newClient', (data) => {
      setClients((prevClients) => [...prevClients, data.clientId]);
    });

    socket.on('supportMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, `Client: ${data.message}`]);
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
    alert(message)

    if (message && currentClientId) {
      alert('veio aqui')
      socket.emit('supportMessage', { clientId: currentClientId, message });
      setMessage('');
    }
  };  



  return (
    <div className="container">
      <div className="sidebar">
        {admins.map((adm) => (
          <div
            key={adm.socketId}
            className="sidebar-item"
            onClick={() => addMessage(adm.socketId, adm.message)}
          >
            <img src={avatar} alt="Avatar" />
            <div className="sidebar-item-text">
              <p>{adm.user}</p>
              <p>{adm.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="main">
        <div className="main-messages">
          {currentMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <div className="main-input">
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows="4"
            cols="50"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
