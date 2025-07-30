import express from 'express';
import { addTopic, listTopics, deleteTopic, renameTopic, editContext, editTitle, uploadPicture } from '../controllers/topicController.js';
import { topicTable } from '../models/topicModel.js';
import multer from 'multer';

const topicRoute = express.Router();

// Initialize the topics table
topicTable();

// Route to add a new topic
topicRoute.post('/add', addTopic);
topicRoute.post('/delete', deleteTopic);
topicRoute.post('/rename', renameTopic);
topicRoute.post('/editContext', editContext);
topicRoute.post('/editTitle', editTitle);
topicRoute.get('/list', listTopics);

// Route to handle image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

topicRoute.post('/uploads', upload.single('image'),uploadPicture);

export default topicRoute;
