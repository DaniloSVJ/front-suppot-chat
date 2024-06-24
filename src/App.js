import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import avatar from './4792929.png'
const socket = io('http://localhost:4000');

function App() {
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState('');
  const [idSocket, setIdSockt] = useState(0);
  useEffect(() => {

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      setIdSockt(idSocket);
    });
  }, []);

  const sendMessage = (username) => {
    if (response) {
      socket.emit('message', { username: 'Support', message: response });
      setResponse('');
    }
  };

  return (
    <div  style={{ width: '100%', height: '100%' }} >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '33%', flexDirection: 'column',}}>
          <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #000' }} >
            <img
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={avatar} />
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <p style={{ lineHeight: 0.1 }}>Chama o Bil</p>
              <p style={{ lineHeight: 0.1 }} >...Ajuda com imagem não aparecendo</p>
            </div>


          </div>
          <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #000' }} >
            <img
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={avatar} />
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <p style={{ lineHeight: 0.1 }}>Chama o Bil</p>
              <p style={{ lineHeight: 0.1 }} >...Ajuda com imagem não aparecendo</p>
            </div>


          </div>  <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #000' }} >
            <img
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={avatar} />
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <p style={{ lineHeight: 0.1 }}>Chama o Bil</p>
              <p style={{ lineHeight: 0.1 }} >...Ajuda com imagem não aparecendo</p>
            </div>


          </div>  <div style={{ display: 'flex', flexDirection: 'row', borderBottom: '1px solid #000' }} >
            <img
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              src={avatar} />
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <p style={{ lineHeight: 0.1 }}>Chama o Bil</p>
              <p style={{ lineHeight: 0.1 }} >...Ajuda com imagem não aparecendo</p>
            </div>


          </div>
        </div>
        <div style={{ width: '100%', height: '100%'  }}>
          <div style={{ backgroundColor: 'lightblue', height: '100%' }}>

            <p> testet</p>
            <p> testet</p>
            <p> testet</p>
            <p> testet</p>
            <p> testet</p>
            <p> testet</p>
            <p> testet</p>
            {/* <textarea id="w3review" name="w3review" rows="4" cols="50"> */}
          </div>
        </div>
      </div>

    </div>

  );
}

export default App;
