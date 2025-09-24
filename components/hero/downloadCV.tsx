import { ArrowDown } from "lucide-react";


export const DownloadCV =() => {
  return (
    <button
    onClick={() => {
      const link = document.createElement('a');
      link.href = '/assets/Bishal Resume V2.pdf';
      link.download = 'Monerul_Islam_Bishal_Resume.pdf';
      link.target = '_blank';
      link.click();
    }}
      className={
        "group relative max-w-[400px] cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur-sm p-2 px-6 text-center font-semibold w-full md:w-auto ml-[40%] md:ml-0"
      }
    >
      <div className="flex items-center justify-center gap-2.5">
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
