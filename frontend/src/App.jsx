import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/main';
import './App.css'

export default function App() {
  return (
  <Router>
    <main>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  </Router>
  )
}
