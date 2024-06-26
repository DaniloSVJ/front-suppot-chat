import React from 'react';
// import './Sidebar.css';

function Sidebar({ clients, selectClient }) {
  return (
    <div className="sidebar">
      <h2>Clients</h2>
      {clients.map((clientId, index) => (
        <div key={index} className="client" onClick={() => selectClient(clientId)}>
          <img src="./4792929.png" alt="avatar" className="avatar" />
          <div>Client ID: {clientId}</div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
