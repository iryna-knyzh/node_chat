import { useState } from 'react';
import axios from 'axios';

const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export const UsernameForm = ({ onSave }) => {
  const [username, setUsername] = useState('');

  return (
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();

        await axios.post(`${API_URL}/users`, { username });
        localStorage.setItem('username', username);
        onSave(username);
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Enter your username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button className="button">Join</button>
    </form>
  );
};
