import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BASE_URL } from '../config';

const socket = io(BASE_URL, {
  transports: ['websocket'],
  withCredentials: true
});


const Editor = () => {
  const { id } = useParams()
  const [content, setContent] = useState('')
  const [showVersionModal, setShowVersionModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [versions, setVersions] = useState([])

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/doc/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setContent(res.data.content)
      } catch (err) {
        console.error('Error fetching document:', err)
      }
    }

    fetchDoc()
    socket.emit('joinDoc', id)
  }, [id])

  const handleChange = e => {
    const text = e.target.value
    setContent(text)
    socket.emit('editDoc', text)
  }

  useEffect(() => {
    socket.on('receiveChanges', data => {
      setContent(data)
    })
    return () => {
      socket.off('receiveChanges')
    }
  }, [])

  const save = async () => {
    try {
      await axios.put(`${BASE_URL}/api/doc/${id}`, { content }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      toast.success('Document saved!')
    } catch (err) {
      console.error('Error saving:', err)
      toast.error(err)
    }
  }

  const openVersionModal = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/doc/version/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setVersions(res.data.reverse())
      setShowVersionModal(true)
    } catch (err) {
      console.error('Error fetching versions:', err)
    }
  }

  const restore = async (index) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/doc/version/restore/${id}`, {
        index
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setContent(res.data.content)
      setShowVersionModal(false)
      alert('Version restored successfully!')
    } catch (err) {
      console.error('Error restoring version:', err)
    }
  }

  const shareLink = `${window.location.origin}/doc/${id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="p-8">
      <textarea
        value={content}
        onChange={handleChange}
        className="w-full h-96 border p-4 text-base rounded"
      />
      <div className="mt-4 flex gap-4 flex-wrap">
        <button
          onClick={save}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          onClick={openVersionModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Versions
        </button>
        <button
          onClick={() => setShowShareModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Share
        </button>
      </div>


      {showVersionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-2xl p-6 rounded shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowVersionModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Document Versions</h2>
            <ul className="space-y-4">
              {versions.map((v, index) => (
                <li key={index} className="border p-4 rounded shadow">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {new Date(v.timestamp).toLocaleString()}
                    </span>
                    <button
                      onClick={() => restore(versions.length - 1 - index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Revert
                    </button>
                  </div>
                  <pre className="bg-gray-100 mt-2 p-2 rounded max-h-40 overflow-y-auto text-sm whitespace-pre-wrap">
                    {v.content}
                  </pre>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

  
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded shadow-lg relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Share Document</h2>
            <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
              <span className="break-all">{shareLink}</span>
              <button
                onClick={copyToClipboard}
                className="bg-purple-600 text-white text-sm px-3 py-1 rounded ml-2 hover:bg-purple-700"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Editor
