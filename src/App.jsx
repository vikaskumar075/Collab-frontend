import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Create from './Pages/Create'
import Editor from './Pages/Editor'
import { ToastContainer } from 'react-toastify'



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Register />} />
      <Route path="/create" element={<Create />} />
      <Route path="/doc/:id" element={<Editor />} />
    </Routes>
         <ToastContainer position="top-right" autoClose={3000} />
  </BrowserRouter>
)

export default App
