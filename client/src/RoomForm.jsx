import { useState } from 'react';
import axios from 'axios';

const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export const RoomForm = ({ onCreated }) => {
  const [name, setName] = useState('');

  return (
    <form
      className="field is-horizontal"
      onSubmit={async (event) => {
        event.preventDefault();
        await axios.post(`${API_URL}/rooms`, { name });
        setName('');
        onCreated();
      }}
    >
      <input
        type="text"
        className="input"
        placeholder="Room name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button className="button">Create Room</button>
    </form>
  );
};
