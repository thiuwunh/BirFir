import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoute.js';
import topicRoute from './routes/topicRoute.js';
import 'dotenv/config.js';
import helmet from 'helmet';
import { connection } from './config/db.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//app config
const app = express();
const port = 4000; 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//db connection
connectDB();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

//API endpoints
app.use('/api/users', userRoute);
app.use('/api/topics', topicRoute);

//queries
