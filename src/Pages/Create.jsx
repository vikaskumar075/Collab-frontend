import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Create = () => {
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const create = async () => {
    if (!title.trim()) {
      toast.error('Please enter a title')
      return
    }

    try {
      const res = await axios.post('http://localhost:5000/api/doc/create', 
        { title }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      toast.success('Document created')
      navigate(`/doc/${res.data._id}`)
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create document')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2a7496] to-aqua px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Document</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter document title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a7496]"
          />
        </div>

        <button
          onClick={create}
          className="w-full bg-[#2a7496] hover:bg-[#256b85] text-white font-semibold py-2 rounded-lg transition"
        >
          Create Document
        </button>
      </div>
    </div>
  )
}

export default Create
