import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const create = async () => {
    const res = await axios.post('http://localhost:5000/api/doc/create', { title }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    navigate(`/doc/${res.data._id}`)
  }

  return (
    <div className="p-8 max-w-sm mx-auto">
      <input placeholder="Document Title" onChange={e => setTitle(e.target.value)} className="w-full mb-2 p-2 border" />
      <button onClick={create} className="bg-purple-500 text-white px-4 py-2 w-full">Create Document</button>
    </div>
  )
}

export default Create
