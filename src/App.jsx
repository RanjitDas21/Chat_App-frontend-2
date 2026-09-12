import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import PageLoader from './components/PageLoader.jsx'
import {Toaster} from "react-hot-toast"

function App() {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if(isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen bg-zinc-50 relative flex items-center justify-center p-4 overflow-hidden">

      {/* Subtle backdrop texture — a faint dot grid, no glow/gradient noise */}
      <div className="absolute inset-0 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]" />

      <div className="relative w-full flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
        </Routes>
      </div>

      <Toaster
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#1c1c1e",
            border: "1px solid #e4e4e7",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          },
          success: { iconTheme: { primary: "#3a5c7d", secondary: "#ffffff" } },
        }}
      />

    </div>
  )
}

export default App