import React, { useState, useContext, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { StoreContext } from '../../contexts/StoreContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';
import './Exam.css';

export default function Exam() {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [newTopic, setNewTopic] = useState('');
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState('');
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [editTitle, setEditTitle] = useState(false);
  const [editorContent, setEditorContent] = useState(false);
  const { url, topics, setTopics, fetchTopics } = useContext(StoreContext);
  const validLevel = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const { level } = useParams();

  // ✅ Fetch topics từ backend bằng axios

  if (!validLevel.includes(level)) {
    return <Navigate to='*' replace />;
  }

  const handleAddTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      setTitle(newTopic);
      setContext('Hãy nhập nội dung cho chủ đề mới');
      await axios.post(`${url}/api/topics/add`, { topic_name: newTopic, topic_level: level, title, context });
      setNewTopic('');
      setTitle('');
      setContext('');
      fetchTopics();
    } catch (err) {
      console.error('Lỗi khi thêm topic:', err);
    }
  };

  const handleDeleteTopic = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa chủ đề này?')) return;
    try {
      await axios.post(`${url}/api/topics/delete`, { id });
      if (selectedTopicId === id) setSelectedTopicId(null);
      fetchTopics();
    } catch (err) {
      console.error('Lỗi khi xóa topic:', err);
    }
  };

  const handleRenameTopic = async (id) => {
    try {
      await axios.post(`${url}/api/topics/rename`, { id, newName: renameValue });
      setRenamingId(null);
      setRenameValue('');
      fetchTopics();
    } catch (err) {
      console.error('Lỗi khi đổi tên topic:', err);
    }
  };

  const handleRenameTitle = async (id) => {
    try {
      await axios.post(`${url}/api/topics/editTitle`, { id, newTitle: renameValue });
      setEditTitle(false);
      setRenameValue('');
      fetchTopics();
    } catch (err) {
      console.error('Lỗi khi đổi tên tiêu đề:', err);
    }
  }

  const handleEditContext = async (id) => {
    try {
      await axios.post(`${url}/api/topics/editContext`, { id, newContext: context });
      setEditorContent(false);
      fetchTopics();
    } catch (err) {
      console.error('Lỗi khi chỉnh sửa nội dung:', err);
    }
  };

  const selectedTopic = topics.find(t => t.id === selectedTopicId);
  console.log(selectedTopic);

  return (
    <div className="article-page">
      <div className="sidebarr">
        <br />
        <h3>Chủ đề</h3>
        <button onClick={fetchTopics}>↻ Reload</button>
        <ul>
          {topics.filter(topic => topic.topic_level === level).map(topic => (
            <li key={topic.id}>
              {renamingId === topic.id ? (
                <>
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameTopic(topic.id)}
                    />
                  <button onClick={() => handleRenameTopic(topic.id)}>Lưu</button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => {setSelectedTopicId(topic.id), setContext(topic.context)}}
                    style={{ cursor: 'pointer' }}
                  >
                    {topic.topic_name}
                  </span>
                  
                  <button onClick={() => {
                    setRenamingId(topic.id);
                    setRenameValue(topic.topic_name);
                  }}>✎</button>
                  <button onClick={() => handleDeleteTopic(topic.id)}>🗑</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="add-topic">
          <input
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            placeholder="Thêm chủ đề"
          />
          <button onClick={handleAddTopic}>+</button>
        </div>
      </div>
      <div className="main-contents">
        <div className="content-header">
          <h2>{selectedTopic?.topic_name || 'Chọn một chủ đề'}</h2>
        </div>
        <div className="content-body">
          {selectedTopic ? (
            <div>
              <h3>Thông tin chi tiết</h3>
              <p><strong>Date:</strong> {selectedTopic.date}</p>
              <p><strong>Level:</strong> {selectedTopic.topic_level}</p>
              
              {editTitle ? (
                <>
                  <input
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleRenameTitle(selectedTopic.id)}
                    />
                  <button onClick={() => handleRenameTitle(selectedTopic.id)}>Lưu</button>
                </>
              ) : (
                <>
                  <strong>Title:</strong> {selectedTopic.title}
                  <button onClick={() => {
                    setEditTitle(true);
                    setRenameValue(selectedTopic.title);
                  }}>✎</button>
                </>
              )}
              <br/>
              <br/>
              <button onClick={() => setEditorContent(!editorContent)}>Sửa nội dung</button>
              {editorContent ? (
                <>
                  <ReactQuill
                    theme="snow"
                    value={context}
                    onChange={setContext}
                    placeholder="Nhập nội dung ở đây..."
                  />
                  <button onClick={() => handleEditContext(selectedTopic.id)}>Lưu</button>
                  <button onClick={() => setEditorContent(false)}>Hủy</button>
                </>
                
              ) : (
                <div dangerouslySetInnerHTML={{ __html: selectedTopic.context }} />
              )}
              {/* Thêm các thông tin khác nếu cần */}
            </div>
          ) : (
            <p>Vui lòng chọn một chủ đề để xem chi tiết.</p>
          )}
        </div>
      </div>
    </div>
  );
}
