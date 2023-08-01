import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import sample from './sample';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: `API - ${process.env.API_NAME}`,
  });
});

router.use('/sample', sample);

export default router;
