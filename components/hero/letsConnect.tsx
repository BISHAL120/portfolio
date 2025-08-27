import { ArrowRight } from "lucide-react";

export const LetsConnectButton = () => {
  return (
    <button
      className={
        "group relative cursor-pointer overflow-hidden rounded-full border border-white/10 bg-white/10 backdrop-blur-sm p-2 md:px-6 text-center font-semibold mr-[40%] md:mr-0 w-full md:w-auto max-w-[400px] flex justify-center"
      }
    >
      {/* Original Section */}
      <div className="flex items-center gap-2">
        <span className="font-mono inline-block transition-all font-light text-white duration-300 group-hover:translate-x-12 group-hover:opacity-0 ">
          Lets Connect
        </span>
        <div className="p-2 flex items-center justify-center rounded-full bg-black border transition-all duration-500 group-hover:scale-[100.8]">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </div>
      </div>
      {/* After Animation Section */}
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center bg-white backdrop-blur-sm gap-2 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-6 group-hover:opacity-100">
        <span className="ml-12">Lets Connect</span>
        <ArrowRight />
      </div>
    </button>
  );
};

export default LetsConnectButton;
