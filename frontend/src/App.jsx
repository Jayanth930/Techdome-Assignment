import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage" 
import UserCheckPage from "./pages/UserCheckPage"
import ProfilePage from "./pages/ProfilePage"
import HomePage from "./pages/HomePage"
import AdminDashboard from "./pages/AdminDashboard"

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
