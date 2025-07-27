import { connection } from '../config/db.js';
import sanitizeHtml from 'sanitize-html';

export const addTopic = async (req, res) => {

    const { topic_name, topic_level, title, context } = req.body;

    if (!topic_name || !topic_level || !title || !context) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        let newContext = sanitizeHtml(context);
        const [result] = await connection.query(
            'INSERT INTO topics (topic_name, topic_level, title, context) VALUES (?, ?, ?, ?)',
            [topic_name, topic_level, title, newContext]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, topic_name, topic_level, title, newContext } });
    } catch (error) {
        console.error('Error adding topic:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const listTopics = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM topics');
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const deleteTopic = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: 'Missing topic ID' });
    }

    try {
        const [result] = await connection.query('DELETE FROM topics WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }
        res.status(200).json({ success: true, message: 'Topic deleted successfully' });
    } catch (error) {
        console.error('Error deleting topic:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const renameTopic = async (req, res) => {
    const { id, newName } = req.body;

    if (!id || !newName) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const [result] = await connection.query('UPDATE topics SET topic_name = ? WHERE id = ?', [newName, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }
        res.status(200).json({ success: true, message: 'Topic renamed successfully' });
    } catch (error) {
        console.error('Error renaming topic:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const editTitle = async (req, res) => {
    const { id, newTitle } = req.body;
    if (!id || !newTitle) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    try {
        const [result] = await connection.query('UPDATE topics SET title = ? WHERE id = ?', [newTitle, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }
        res.status(200).json({ success: true, message: 'Title updated successfully' });
    } catch (error) {
        console.error('Error updating title:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const editContext = async (req, res) => {
    const { id, newContext } = req.body;

    if (!id || !newContext) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        let sanitizedContext = sanitizeHtml(newContext);
        const [result] = await connection.query('UPDATE topics SET context = ? WHERE id = ?', [sanitizedContext, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Topic not found' });
        }
        res.status(200).json({ success: true, message: 'Context updated successfully' });
    } catch (error) {
        console.error('Error updating context:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}