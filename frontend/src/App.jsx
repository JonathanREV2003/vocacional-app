import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/main';
import Dashboard from './pages/Dashboard';
import './App.css'

export default function App() {
  return (
  <Router>
    <main>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </main>
  </Router>
  )
}
