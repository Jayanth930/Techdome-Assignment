import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage" 
import UserCheckPage from "./pages/UserCheckPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import AdminDashboard from "./pages/AdminDashboard"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function App() {
 
  return (
    <>
      <ToastContainer autoClose={2000}  />
      <Routes>
        <Route path="/" element={<UserCheckPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      {/* <Modal /> */}
    </>
  )
}

export default App
