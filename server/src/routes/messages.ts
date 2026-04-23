import { Router } from 'express';
import { rooms, emitter, Message } from '../store.js';

const router = Router();

router.post('/', (req, res) => {
  const { roomId, text, username } = req.body;
  if (!rooms[roomId]) {
    res.status(404).send({ error: 'Room not found' });
    return;
  }
  const message: Message = { username, text, time: new Date(), roomId };
  rooms[roomId].messages.push(message);
  emitter.emit('message', message);
  res.status(201).send(rooms[roomId].messages);
});

export default router;
