import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()



const handleRegister = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      username,
      email,
      password
    })
    console.log(res);
    
    alert(res.data.message)
    navigate('/login')
  } catch (err) {
    alert(err.response?.data?.error || 'Registration failed')
  }
}

  return (
    <div className="flex h-screen w-full">
      
      <div
        className="w-1/2 hidden md:flex items-center justify-center relative"
        style={{
          backgroundImage: ` url(https://blog.mindmanager.com/wp-content/uploads/2022/03/shutterstock_1836258856.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
      
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
      
        <div className="bg-white/90 backdrop-blur-md shadow-xl p-10 rounded-xl w-full max-w-md">
         
          <h2 className="text-3xl font-bold text-center text-[#2a7496] mb-6">Sign Up</h2>

          <div className="relative mb-4">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
              className="w-full pl-10 p-3 border border-gray-300 rounded-md"
            />
          </div>

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
            onClick={handleRegister}
            className="w-full bg-[#2a7496] hover:bg-[#256a87] text-white py-3 rounded-md transition"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4 text-black">
            Already have an account?{' '}
            <a href="/login" className="underline font-medium text-blue-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
