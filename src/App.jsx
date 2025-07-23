import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Create from './Pages/Create'
import Editor from './Pages/Editor'



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<Create />} />
      <Route path="/doc/:id" element={<Editor />} />
    </Routes>
  </BrowserRouter>
)

export default App
