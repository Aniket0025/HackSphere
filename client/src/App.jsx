import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
import VerifyOtp from './auth/VerifyOtp.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './pages/Dashboard.jsx'





const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App