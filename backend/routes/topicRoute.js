import express from 'express';
import { addTopic, listTopics, deleteTopic, renameTopic, editContext, editTitle } from '../controllers/topicController.js';
import { topicTable } from '../models/topicModel.js';

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

export default topicRoute;