import express from 'express';
import cors from 'cors';

import usersRoutes from './user/userRoutes';
import disksRoutes from './disk/diskRoutes';
import swapsRoutes from './swap/swapRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', usersRoutes);
app.use('/disks', disksRoutes);
app.use('/swaps', swapsRoutes);

export default app;
