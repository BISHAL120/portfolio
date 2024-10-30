import { BackgroundLines } from "../ui/background-lines";
import { Spotlight } from "../ui/spotlight";
import TextAnimate from "../ui/text-animate";
import Details from "./details";
export default function Hero() {
  return (
    <div
      id="hero"
      className="w-full relative min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden"
    >
      <Spotlight
        className="-top-10 left-10  md:left-60 md:-top-20"
        fill="white"
      />
      <BackgroundLines className="flex  md:items-center md:justify-center w-full min-h-screen flex-col px-4">
        <div className="mt-20 p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <div className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            <TextAnimate
              className="text-white flex justify-center"
              text="Monerul Islam Bishal "
              type="popIn"
            />
            <TextAnimate
              className="text-white flex justify-center mt-4"
              text="Full Stack Developer"
              type="calmInUp"
            />
          </div>
          <Details className="mt-10 md:mt-0" />
        </div>
      </BackgroundLines>
    </div>
  );
}
