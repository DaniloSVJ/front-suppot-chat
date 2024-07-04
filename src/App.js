import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const textAreaRef = useRef(null)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messagesSidebar, setMessagesSidebar] = useState([]);

  const [clients, setClients] = useState([]);
  const [currentClientId, setCurrentClientId] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', {room: 'support', supportId: socket.id});
    
    // const msgsSidebar =  fetch(`http://localhost:4000/chat/newmessages`); // Substitua pela URL da sua API
    
    // //Exemplo para carregar mensagens novas ou sinais de novamensagens
    // setMessagesSidebar(msgsSidebar)

    //Aqui vc pode carregar pode chamar a api 

    //Utilize para escutar as mensagem do suporte
    socket.on('supportMessage', (data) => {
      alert(data.projectId)
      //Aqui dentro vc implementa um sete para alimentar a variavel com a mensagem do suporte
      setMessages((prevClients) => [...prevClients, data.messages]);//Exemplo

    });
   
    return () => {
      socket.off('supportMessage');
    };

  }, []);

  const selectClientParaResponder = async (data) => {
    setCurrentClientId(data.projectId);
    // try {
    //   const response = await fetch(`http://localhost:4000/chat/messages/${data.projectId}`); // Substitua pela URL da sua API
    //   const result = await response.json();

    //   //IMPLEMENTAÇÃO DA LOGICA PARA CARREGAR AS MESAGENS DO CLIENTE SELECIONADO PARA RESPONDER

    // } catch (error) {
    //   console.error('Erro ao buscar dados da API:', error);
    // }
     //      http://localhost:4000/chat/messages/${data.projectId}

  };

  const sendMessage = () => {
  
    if (message) {
      socket.emit('supportMessage', {
        userType: 'support',            //quem ta enviando a mensagem
        socketId: '20buscar',      //socket id do cliente
        projectId: '20buscar',     //socket id do cliente
        supportId: socket.id,           //socket id do support
        messageType: 'message',         //texto ou imagem {string} 
        messages: message,              //mensagem que está sendo enviada para tela do o cliente
        orige: 'support'                //quem ta enviando a mensagem
      });
      
    }
  };

  return (
    <div>
      <h1>Chat Support</h1>
      <div id="clients">
        {clients.map((data, index) => (
          <div
            style={{ marginRight: '20px', height: '100px', width: '200px', color: '#fff', backgroundColor: 'blue', cursor: 'pointer' }}
            key={index} onClick={() => selectClientParaResponder(data)}>
            Client ID: {data.projectId}
          </div>
        ))}
      </div>
      <div id="messages">
        {messages.map((msg, index) => (
          <div>

          </div>
        ))}
      </div>
      <div>
        <textarea ref={textAreaRef} >

        </textarea>
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
