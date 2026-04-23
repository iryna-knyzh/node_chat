import { Router } from 'express';
import { users } from '../store.js';

const router = Router();

router.post('/', (req, res) => {
  const { username } = req.body;
  users.push(username);
  res.status(201).send(users);
});

export default router;
