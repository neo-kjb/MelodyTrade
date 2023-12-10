import express from 'express';
import usersRoutes from './user/userRoutes';
import disksRoutes from './disk/diskRoutes'
const app = express();
app.use(express.json())

app.use('/auth',usersRoutes)
app.use('/disks',disksRoutes)



export default app