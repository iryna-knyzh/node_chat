// #region imports
import { useEffect, useState } from "react";
import "./App.css";
import { MessageForm } from "./MessageForm.jsx";
import { MessageList } from "./MessageList.jsx";
// #endregion

const DataLoader = ({ onData }) => {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3004");

    socket.addEventListener("open", (event) => {
      socket.send("Hello from server");
    });

    socket.addEventListener("message", (event) => {
      const text = JSON.parse(event.data);

      console.log('on message', text);

      onData(text);
    });
  }, []);

  return <h1 className="title">Chat application</h1>;
};

export function App() {
  const [messages, setMessages] = useState([]);

  function saveData(message) {
    console.log('set messages', message);
    setMessages((messages) => [message, ...messages]);
  }

  return (
    <section className="section content">
      <DataLoader onData={saveData} />

      <MessageForm />
      <MessageList messages={messages} />
    </section>
  );
}
