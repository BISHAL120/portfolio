import { IconCloud } from "@/app/skill/cloudIcon";
import { motion } from "framer-motion";
import { BackgroundLines } from "../ui/background-lines";
import { Spotlight } from "../ui/spotlight";
import TextAnimate from "../ui/text-animate";
import LetsConnectButton from "./letsConnect";
import DownloadCV from "./downloadCV";
import { BlurFade } from "./gretting";
import Details from "./details";

const Hero = () => {
  return (
    <div
      id="hero"
      className="relative w-full h-[1150px] lg:h-[800px] overflow-hidden pt-10 md:pt-20 lg:pt-0"
    >
      <Spotlight
        className="-top-10 left-10 md:left-60 md:-top-20"
        fill="#06b6d4"
      />
      {/* Hero Content */}
      <BackgroundLines className="flex flex-col lg:flex-row h-[800px] px-2 items-center justify-between">
        {/* Hero Details Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut" }}
          className="lg:w-[70%] md:p-4 md:max-w-7xl mx-auto z-10 pt-20 md:pt-0"
        >
          <BlurFade delay={0.25} inView>
            <h2 className="text-3xl text-white font-tiny tracking-tighter ">
              Hello There <span className="animate-wave">👋</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <span className="text-2xl font-medium text-white text-pretty tracking-tighter ">
              Nice to meet you, I&apos;m
            </span>
          </BlurFade>

          <div className="text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            <TextAnimate
              className="text-white flex justify-start text-4xl md:text-5xl font-semibold"
              text="Monerul Islam Bishal"
              type="popIn"
            />
            <TextAnimate
              className="text-white flex justify-start mt-3 text-2xl md:text-3xl font-semibold"
              text="Full Stack Developer"
              type="calmInUp"
              delay={1}
            />
          <Details className="md:mt-10 mt-5" />
            <div className="md:mt-10 mt-6 flex flex-wrap items-center justify-center md:justify-start gap-5">
              <LetsConnectButton />
              <DownloadCV />
            </div>
          </div>
        </motion.div>
        {/* Hero Image Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className=" relative z-10 pt-0 md:pt-0"
        >
          <IconCloud />
        </motion.div>
      </BackgroundLines>
    </div>
  );
}


export default Hero;