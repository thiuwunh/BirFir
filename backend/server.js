import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoute.js';
import topicRoute from './routes/topicRoute.js';
import 'dotenv/config.js';
import helmet from 'helmet';
//app config
const app = express();
const port = 4000; 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

//db connection
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

//API endpoints
app.use('/api/users', userRoute);
app.use('/api/topics', topicRoute);

//routes