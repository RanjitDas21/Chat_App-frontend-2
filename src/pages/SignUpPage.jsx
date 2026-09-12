import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";

function SignUpPage() {

  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };
  
   return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl
        bg-white border border-zinc-200
        rounded-2xl shadow-xl shadow-zinc-200/60 overflow-hidden">

          {/* BRAND BAR — spans the full width above the split */}
          <div className="flex items-center gap-2 px-6 sm:px-8 py-4 border-b border-zinc-200">
            <div className="size-8 rounded-lg bg-accent-50 flex items-center justify-center">
              <MessageCircleIcon className="w-4 h-4 text-accent-600" />
            </div>
            <span className="font-semibold text-zinc-900">Chatify</span>
          </div>

          <div className="w-full flex flex-col md:flex-row">
            {/* ILLUSTRATION - LEFT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-8 bg-zinc-50 md:border-r border-zinc-200">
              <div>
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-medium text-zinc-800">Start your journey today</h3>

                  <div className="mt-4 flex justify-center gap-3">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy setup</span>
                    <span className="auth-badge">Private</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM - RIGHT SIDE */}
            <div className="md:w-1/2 p-8 sm:p-10 flex items-center justify-center">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-zinc-900 mb-1.5">Create account</h2>
                  <p className="text-zinc-500">Sign up to get started</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* FULL NAME */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />

                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>

                  {/* EMAIL INPUT */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button className="auth-btn flex items-center justify-center" type="submit" disabled={isSigningUp}>
                    {isSigningUp ? (
                      <LoaderIcon className="size-5 animate-spin" />
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account? Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default SignUpPage