import React from "react";

const CustomTitle = () => {
  return (
    <div>
      <div
        className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
        
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"

        ></div>
        <span className="text-8xl md:text-[10rem] font-extrabold bg-gradient-to-r from-white/15 via-white/10 to-white/5 bg-clip-text text-transparent select-none tracking-tighter">
          SKILLS
        </span>
        <h2 className="absolute text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-gray-300 capitalize ">
          Skills
        </h2>
      </div>
    </div>
  );
};

export default CustomTitle;
