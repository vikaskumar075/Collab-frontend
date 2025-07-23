import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { BASE_URL } from '../config';
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

 const handleLogin = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password
    })
    localStorage.setItem('token', res.data.token)
    alert("Login Successfully")
    navigate('/create')
  } catch (err) {
    alert(err.response.data.error || 'Login failed')
  }
}


  return (
    <div className="flex h-screen w-full">

      <div className="w-[50%] hidden md:flex items-center justify-center bg-white">
        <img
          src="https://filestage.io/wp-content/uploads/2023/04/project-collaboration-header-image-1.webp"
          alt="Collaboration Illustration"
          className="h-full w-full object-fit"
        />
      </div>

  
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white to-aqua">
        <div className="bg-white/80 backdrop-blur-md shadow-2xl p-10 rounded-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[#2a7496] mb-6">Login</h2>

          <div className="relative mb-4">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#2a7496] hover:bg-[#256a87] text-white py-3 rounded-md transition"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4 text-black">
            Don't have an account?{' '}
            <a href="/" className="underline font-medium text-black/90">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
