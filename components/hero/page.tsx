import { BackgroundLines } from "../ui/background-lines";
import { Spotlight } from "../ui/spotlight";
import TextAnimate from "../ui/text-animate";
import Details from "./details";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div
      id="hero"
      className="w-full relative min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] overflow-hidden"
    >
      <Spotlight
        className="-top-10 left-10 md:left-60 md:-top-20"
        fill="white"
      />
      <BackgroundLines className="flex md:items-center md:justify-center w-full min-h-screen flex-col md:px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 md:p-4 md:max-w-7xl mx-auto relative z-10 pt-20 md:pt-0"
        >
          <div className="text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            <TextAnimate
              className="text-white flex justify-center text-3xl md:text-6xl font-bold"
              text="Monerul Islam Bishal"
              type="popIn"
            />
            <TextAnimate
              className="text-white flex justify-center mt-4 text-xl md:text-4xl font-semibold"
              text="Full Stack Developer"
              type="calmInUp"
            />
          </div>
          <Details className="mt-10 md:mt-0 px-4 md:px-0" />
        </motion.div>
      </BackgroundLines>
    </div>
  );
}
