import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Main from './pages/Main';
import Dashboard from './pages/Dashboard';
import Test from './pages/Test';
import Chatbot from './pages/Chatbot';
import InterviewChat from './pages/InterviewChat';
import './App.css'

export default function App() {
  return (
  <Router>
    <main>
       <Routes>
           <Route path="/" element={<Main />} />
           <Route path="/login" element={<Login />} />
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/test" element={<Test />} />
           <Route path="/chatbot" element={<Chatbot />} />
           <Route path="/interview-chat" element={<InterviewChat />} />
       </Routes>
    </main>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </Router>
  )
}
