"use client";
import React from "react";

const TittleV2 = ({text, showDesc, desc}: {text: string, showDesc?: boolean, desc?: string}) => {
  return (
    <>
      {/* Glow animation keyframes */}
      <style>
        {`
          @keyframes glow {
            0%, 100% {
              text-shadow: rgba(255, 255, 255, 0.05) 0px 4px 8px,
                           rgba(255, 255, 255, 0.25) 0px 8px 30px;
              opacity: 1;
            }
            50% {
              text-shadow: rgba(255, 255, 255, 0.01) 0px 2px 4px,
                           rgba(255, 255, 255, 0.1) 0px 4px 15px;
              opacity: 0.6;
            }
          }

          .glow-animate {
            animation: glow 2s ease-in-out infinite;
          }
        `}
      </style>

      <div className="flex flex-col items-center justify-center py-16 md:mt-20 px-4 text-center">
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
          {/* Blurred background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>

          {/* Main animated title */}
          <span className="glow-animate text-8xl md:text-[10rem] font-extrabold bg-gradient-to-r from-white/10 via-white/5 to-white/2 bg-clip-text text-transparent select-none tracking-tighter">
            {text}
          </span>

          {/* Subtitle */}
          <h2 className="absolute text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-gray-300 capitalize">
            {text}
          </h2>
        </div>

        {/* Decorative line and dot */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-purple-500/70"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50"></div>
        </div>

        {/* Description */}
        {showDesc && (
          <p className="text-base md:text-lg tracking-wider text-gray-300 uppercase max-w-md font-light">
            {desc}
          </p>
        )}
      </div>
    </>
  );
};

export default TittleV2;
