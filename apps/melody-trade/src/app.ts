import express from 'express';
import userRoutes from './user/userRoutes';
const app = express();
app.use(express.json())

app.use('/auth',userRoutes)



export default app