import { Route, Routes } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage" 
import UserCheckPage from "./components/UserCheckPage"
import ProfilePage from "./components/ProfilePage"
import HomePage from "./components/HomePage"
import AdminDashboard from "./components/AdminDashboard"
import Modal from "./components/Modal"
function App() {
 
  return (
    <>
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
