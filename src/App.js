import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'POST',
        body: message,
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setMessage('');
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const handleGetMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error getting messages:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ marginBottom: '10px', padding: '8px', width: '200px' }}
      />
      <button onClick={handleSubmit} style={{ marginBottom: '10px', padding: '8px', backgroundColor: 'lightblue' }}>Submit</button>
      <button onClick={handleGetMessages} style={{ padding: '8px', backgroundColor: 'lightgreen' }}>Get Messages</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {messages.map((msg, index) => (
          <li key={index} style={{ marginBottom: '5px' }}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
