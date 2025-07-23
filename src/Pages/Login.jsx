import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
    localStorage.setItem('token', res.data.token)
    navigate('/create')
  }

  return (
    <div className="p-8 max-w-sm mx-auto">
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full mb-2 p-2 border" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full mb-2 p-2 border" />
      <button onClick={login} className="bg-blue-500 text-white px-4 py-2 w-full">Login</button>
    </div>
  )
}

export default Login
