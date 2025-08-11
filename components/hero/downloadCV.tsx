import { ArrowDown } from "lucide-react";


export const DownloadCV =() => {
  return (
    <button
      className={
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur-sm p-2 px-6 text-center font-semibold"
      }
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono inline-block transition-all text-white font-light duration-300 group-hover:translate-x-12 group-hover:opacity-0">
         Download CV
        </span>
        <div className=" flex items-center justify-center rounded-full bg-white border transition-all duration-500 group-hover:scale-[100.8]">
         <ArrowDown className="w-5 h-5 m-0.5 text-black"/>
        </div>
      </div>
      <div className="absolute top-0 z-10 font-serif flex h-full w-full translate-x-12 items-center justify-center bg-white backdrop-blur-sm gap-2 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-6 group-hover:opacity-100">
        <span>Download CV</span>
        <ArrowDown />
      </div>
    </button>
  );
};

export default DownloadCV;
