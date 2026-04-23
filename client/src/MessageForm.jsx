import { useState } from 'react';
import axios from 'axios';

const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

function sendMessage(text, roomId) {
  const username = localStorage.getItem('username');
  return axios.post(`${API_URL}/messages`, { text, username, roomId });
}

export const MessageForm = ({ roomId }) => {
  const [text, setText] = useState('');

  return (
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();
        await sendMessage(text, roomId);
        setText('');
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Enter a message"
        value={text}
        onChange={event => setText(event.target.value)}
      />
      <button className="button">Send</button>
    </form>
  );
};
