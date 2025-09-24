"use client";

import { useEffect, useState } from "react";

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer
  useEffect(() => {
    // Set target date to 3 days from now
    const targetDate = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 pb-20 xl:pb-0 text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] mt-10 px-4 ">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70 font-medium">
              Currently in Development
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight text-balance">
            Something Amazing
            <br />
            <span className="text-4xl md:text-6xl font-light italic">
              is Coming
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed text-pretty">
            I&apos;m crafting a new digital experience that pushes the
            boundaries of design and development. Get ready for something
            extraordinary.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 md:gap-8 mb-16 animate-fade-in-up delay-300">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 mb-2 hover:bg-white/10 transition-all duration-300">
                <div className="text-3xl md:text-5xl font-bold text-white font-mono">
                  {item.value.toString().padStart(2, "0")}
                </div>
              </div>
              <div className="text-sm md:text-base text-white/50 font-medium uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="w-full mb-7 mt-5 xl:mb-0 xl:mt-0 text-center">
          <p className="text-white/30 text-sm">
            © 2025 • Crafted with passion and precision
          </p>
        </div>
      </div>
    </div>
  );
}
