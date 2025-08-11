import { IconCloud } from "@/app/skill/cloudIcon";
import { motion } from "framer-motion";
import { BackgroundLines } from "../ui/background-lines";
import { Spotlight } from "../ui/spotlight";
import TextAnimate from "../ui/text-animate";
import LetsConnectButton from "./letsConnect";
import DownloadCV from "./downloadCV";
import { BlurFade } from "./gretting";

const Hero = () => {
  return (
    <div
      id="hero"
      className="relative w-full h-[900px] overflow-hidden pt-20"
    >
      <Spotlight
        className="-top-10 left-10 md:left-60 md:-top-20"
        fill="#06b6d4"
      />
      <BackgroundLines className="flex h-[900px]  items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut" }}
          className=" md:p-4 md:max-w-7xl mx-auto z-10 pt-20 md:pt-0"
        >
          <BlurFade delay={0.25} inView>
            <h2 className="text-4xl text-white font-bold tracking-tighter ">
              Hello There 👋
            </h2>
          </BlurFade>
          <BlurFade delay={0.25 * 2} inView>
            <span className="text-3xl font-medium text-white text-pretty tracking-tighter ">
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
              className="text-white flex justify-start mt-3 text-2xl md:text-3xl"
              text="Full Stack Developer"
              type="calmInUp"
              delay={1}
            />
            <div className="mt-10 flex items-center justify-start gap-5">
              <LetsConnectButton />
              <DownloadCV />
            </div>
          </div>
          {/* <Details className="mt-10 md:mt-0 px-4 md:px-0" /> */}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeIn" }}
          className="w-2/5 md:max-w-5xl mx-auto relative z-10 pt-20 md:pt-0"
        >
          <IconCloud />
        </motion.div>
      </BackgroundLines>
    </div>
  );
}


export default Hero;