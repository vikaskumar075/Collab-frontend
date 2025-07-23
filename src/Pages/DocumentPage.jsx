import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

const DocumentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [document, setDocument] = useState(null);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`/api/docs/${id}`);
        setDocument(res.data);
        setContent(res.data.content);
      } catch (err) {
        console.error('Failed to fetch document:', err);
      }
    };

    fetchDocument();

    socketRef.current = io(process.env.REACT_APP_API_URL);
    socketRef.current.emit('join-document', id);

    socketRef.current.on('receive-changes', (data) => {
      if (data.docId === id && data.userId !== user?._id) {
        setContent(data.content);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id, user?._id]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);

    socketRef.current.emit('text-change', {
      docId: id,
      content: newContent,
      userId: user?._id
    });
  };

  const saveDocument = async () => {
    setIsSaving(true);
    try {
      await axios.put(`/api/docs/${id}`, { content });
      setIsSaving(false);
    } catch (err) {
      console.error('Failed to save document:', err);
      setIsSaving(false);
    }
  };

  if (!document) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{document.title}</h1>
        <button
          onClick={saveDocument}
          disabled={isSaving}
          className={`px-4 py-2 rounded-md text-white ${isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isSaving ? 'Saving...' : 'Save Document'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full h-96 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Start collaborating..."
        />
      </div>

      {document.versions?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Version History</h2>
          <div className="space-y-2">
            {document.versions.slice(0, 5).map((version, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-500">
                  Saved on: {new Date(version.savedAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPage;
