import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VersionModal = ({ docId, onClose, onRevert }) => {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const res = await axios.get(`/api/doc/${docId}/versions`);
        setVersions(res.data.reverse()); 
      } catch (err) {
        console.error('Error fetching versions:', err);
      }
    };
    fetchVersions();
  }, [docId]);

  const handleRevert = async (index) => {
    try {
      await axios.post(`/api/doc/${docId}/revert`, { versionIndex: index });
      onRevert(); 
      onClose();
    } catch (err) {
      console.error('Failed to revert version:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto shadow-xl">
        <h2 className="text-xl font-bold mb-4">Document Versions</h2>
        {versions.length === 0 ? (
          <p>No versions available.</p>
        ) : (
          versions.map((v, i) => (
            <div key={i} className="mb-3 border-b pb-2">
              <p className="text-sm text-gray-600">
                {new Date(v.timestamp).toLocaleString()}
              </p>
              <button
                onClick={() => handleRevert(versions.length - 1 - i)}
                className="mt-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Revert to this version
              </button>
            </div>
          ))
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default VersionModal;
