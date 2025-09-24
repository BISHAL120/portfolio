"use client"

import { useState, useEffect } from "react"

const UpdateingAlert = () => {
  const [showOverlay, setShowOverlay] = useState(() => {
    // Check localStorage for saved state, default to true if not found
    // const saved = localStorage.getItem('showUpdateAlert')
    // return saved === null ? true : JSON.parse(saved)
    return true;
  })
  const [isAnimating, setIsAnimating] = useState(false)

  const handleContinue = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowOverlay(false)
      // Save state to localStorage when user dismisses the alert
      // localStorage.setItem('showUpdateAlert', 'false')
    }, 300)
  }

  useEffect(() => {
    // Prevent scrolling when overlay is shown
    if (showOverlay) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showOverlay])

  if (!showOverlay) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ease-out ${
        isAnimating ? "opacity-0 backdrop-blur-none" : "opacity-100 backdrop-blur-md"
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
      }}
    >
      <div
        className={`relative max-w-2xl mx-4 transition-all duration-500 ease-out ${
          isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />

        {/* Main content card */}
        <div className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center shadow-2xl">
          {/* Status indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-emerald-400 text-sm font-medium tracking-wide uppercase">Currently Updating</span>
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight text-balance">
            Crafting Something
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
              Beautiful
            </span>
          </h1>

          {/* Description */}
          <div className="space-y-4 mb-10 text-slate-300 leading-relaxed">
            <p className="text-lg text-balance">
              I&apos;m currently enhancing this portfolio with new projects, refined interactions, and improved performance.
            </p>
            <p className="text-slate-400">
              While some features may be temporarily unavailable, you&apos;re welcome to explore what&apos;s already here.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Progress</span>
              <span>~80%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: "80%" }}
              />
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={handleContinue}
            className="group relative inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 rounded-lg transition-all duration-200 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <span className="relative z-10">View Progress</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </button>

          {/* Subtle footer note */}
          <p className="mt-8 text-xs text-slate-500">Currently Working On Project Section</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
      </div>
    </div>
  )
}

export default UpdateingAlert;
