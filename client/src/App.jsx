// #region imports
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.css";
import { MessageForm } from "./MessageForm.jsx";
import { MessageList } from "./MessageList.jsx";
import { UsernameForm } from "./UsernameForm.jsx";
import { RoomList } from "./RoomList.jsx";
import { RoomForm } from "./RoomForm.jsx";
// #endregion

const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;
const WS_URL = `ws://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export function App() {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [rooms, setRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const activeRoomRef = useRef(null);

  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (activeRoomRef.current?.id === message.roomId) {
        setMessages((prev) => [message, ...prev]);
      }
    });

    return () => socket.close();
  }, []);

  const loadRooms = () => {
    axios.get(`${API_URL}/rooms`).then(({ data }) => setRooms(data));
  };

  useEffect(() => {
    if (username) loadRooms();
  }, [username]);

  useEffect(() => {
    if (activeRoom) {
      axios.get(`${API_URL}/rooms/${activeRoom.id}/messages`).then(({ data }) => setMessages(data));
    }
  }, [activeRoom]);

  if (!username) {
    return (
      <section className="section content">
        <h1 className="title">Chat application</h1>
        <UsernameForm onSave={setUsername} />
      </section>
    );
  }

  if (!activeRoom) {
    return (
      <section className="section content">
        <h1 className="title">Chat application</h1>
        <RoomForm onCreated={loadRooms} />
        <RoomList rooms={rooms} onJoin={setActiveRoom} onUpdate={loadRooms} />
      </section>
    );
  }

  return (
    <section className="section content">
      <h1 className="title">{activeRoom.name}</h1>
      <button className="button" onClick={() => setActiveRoom(null)}>← Back to rooms</button>
      <MessageForm roomId={activeRoom.id} />
      <MessageList messages={messages} />
    </section>
  );
}
