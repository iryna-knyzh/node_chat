import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import EventEmitter from 'events';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const emitter = new EventEmitter();

const messages = [];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/messages', (req, res) => {
  const { text } = req.body;

  const message = {
    text,
    time: new Date(),
  };

  messages.push(message);
  emitter.emit('message', message);

  res.status(201).send(messages);
});

const server = app.listen(PORT);

const wss = new WebSocketServer({ server });

wss.on('connection', client => {
  client.on('message', text => {
    const message = {
      text: text.toString(),
      time: new Date(),
    };
    messages.push(message);

    emitter.emit('message', message);
  });
});

emitter.on('message', data => {
  for (const client of wss.clients) {
    client.send(JSON.stringify(data));
  }
});
