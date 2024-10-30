import { BackgroundLines } from "../ui/background-lines";
import { Spotlight } from "../ui/spotlight";
import TextAnimate from "../ui/text-animate";
import Details from "./details";
export default function Hero() {
  return (
    <div
      id="hero"
      className="w-full min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden"
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
        <div className="mt-20 p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
          <div className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            <TextAnimate
              className="text-white flex justify-center"
              text=" I'm Bishal "
              type="fadeIn"
            />

            <TextAnimate
              delay={2}
              className="text-white flex justify-center"
              text="Full Stack Developer"
              type="popIn"
            />
          </div>
          <Details />
          <div className="mt-8"></div>
        </div>
      </BackgroundLines>
    </div>
  );
}
