import React from "react";

const Tittle = ({tittle, showDesc, desc}: {tittle: string, showDesc: boolean, desc: string}) => {
  return (
    <div>
      <h2
        className="relative text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl text-center z-30 pb-5 mb-0 md:mb-0 bottom-0 size-full"
        style={{
          textShadow: "rgba(255, 255, 255, 0.05) 0px 4px 8px, rgba(255, 255, 255, 0.25) 0px 8px 30px",
          opacity: 1,
          transform: "none",
        }}
      >
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl"></div>
            <span className="text-8xl md:text-[10rem] font-extrabold bg-gradient-to-r from-white/10 via-white/5 to-white/2 bg-clip-text text-transparent select-none tracking-tighter">
              {tittle}
            </span>
            <h2 className="absolute text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-gray-300 capitalize ">
              {tittle}
            </h2>
          </div>
          <div className="flex items-center gap-4 my-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/50"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500/70"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/50"></div>
          </div>
          {showDesc && (
            <p className="text-base md:text-lg tracking-wider text-gray-300 uppercase max-w-md text-center font-light">
              {desc}
            </p>
          )}
        </div>
      </h2>
    </div>
  );
};

export default Tittle;   
