import { useState } from 'react';
import axios from 'axios';

const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export const RoomList = ({ rooms, onJoin, onUpdate }) => {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleRename = async (id) => {
    await axios.patch(`${API_URL}/rooms/${id}`, { name: editName });
    onUpdate();
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/rooms/${id}`);
    onUpdate();
  };

  return (
    <ul>
      {rooms.map(room => (
        <li key={room.id}>
          {editId === room.id ? (
            <>
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
              <button onClick={() => handleRename(room.id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {room.name}
              {' '}
              <button onClick={() => onJoin(room)}>Join</button>
              {' '}
              <button onClick={() => { setEditId(room.id); setEditName(room.name); }}>Rename</button>
              {' '}
              <button onClick={() => handleDelete(room.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};
