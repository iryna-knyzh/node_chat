import { Router } from 'express';
import { rooms } from '../store.js';

const router = Router();

router.get('/', (_req, res) => {
  const list = Object.entries(rooms).map(([id, room]) => ({ id, name: room.name }));
  res.status(200).send(list);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const id = name.toLowerCase().replace(/\s+/g, '-');
  rooms[id] = { name, messages: [] };
  res.status(201).send({ id, name });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!rooms[id]) {
    res.status(404).send({ error: 'Room not found' });
    return;
  }
  rooms[id].name = name;
  res.status(200).send({ id, name });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!rooms[id]) {
    res.status(404).send({ error: 'Room not found' });
    return;
  }
  delete rooms[id];
  res.status(204).send();
});

router.get('/:id/messages', (req, res) => {
  const { id } = req.params;
  if (!rooms[id]) {
    res.status(404).send({ error: 'Room not found' });
    return;
  }
  res.status(200).send(rooms[id].messages);
});

export default router;
