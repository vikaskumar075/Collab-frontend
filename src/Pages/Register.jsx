import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const register = async () => {
    await axios.post('http://localhost:5000/api/auth/register', { username, email, password })
    navigate('/')
  }

  return (
    <div className="p-8 max-w-sm mx-auto">
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} className="w-full mb-2 p-2 border" />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 border" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full mb-2 p-2 border" />
      <button onClick={register} className="bg-green-500 text-white px-4 py-2 w-full">Register</button>
    </div>
  )
}

export default Register
