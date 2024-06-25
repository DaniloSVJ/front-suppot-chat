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

  const initialAdmins = [
    {
      socketId: 1,
      user: 'admin1',
      message: "tela quebrada"
    },
    {
      socketId: 2,
      user: 'admin2',
      message: "erro no sistema"
    },
    {
      socketId: 3,
      user: 'admin3',
      message: "Oi bom dia como faço para ver o relatorio, desde já agradeço"
    },
    {
      socketId: 4,
      user: 'admin4',
      message: "Não estou localizando o meu motorista"
    },
  ];

  useEffect(() => {
    setAdmins(initialAdmins); // Inicializa a lista de admins

    socket.on('message', (message) => {
      // Adiciona a mensagem ao histórico global de mensagens
      setMessages((prevMessages) => [...prevMessages, message]);

      // Se a mensagem é do admin selecionado, atualiza as mensagens atuais
      if (message.id === selectedAdminId) {
        setCurrentMessages((prevMessages) => [...prevMessages, message.msg]);
      }
    });
  }, [selectedAdminId]);

  const addMessage = (id, message) => {
    setSelectedAdminId(id);

    const adminMessages = messages.filter((m) => m.id === id).map((m) => m.msg);

    if (adminMessages.length === 0) {
      setCurrentMessages([message]);
    } else {
      setCurrentMessages(adminMessages);
    }
  };

  const sendMessage = () => {
    if (response && selectedAdminId !== null) {
      const newMessage = { id: selectedAdminId, msg: response };
      socket.emit('message', newMessage);

      // Adiciona a nova mensagem ao histórico global de mensagens
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Adiciona a nova mensagem às mensagens atuais
      setCurrentMessages((prevMessages) => [...prevMessages, response]);
      setResponse('');
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
