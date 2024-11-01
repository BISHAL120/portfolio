"use client";
import { motion } from "framer-motion";
import { LampContainer } from "../ui/lamp";
import { MarqueeDemo } from "./uiComponent";
import Globe from "../globe/globe";
// import { useEffect } from "react";

const ReviewComponent = () => {
  /*  useEffect(() => {
    document.location.reload();
  }, []); */
  return (
    <LampContainer className="">
      <motion.div
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <MarqueeDemo />
        <div className="absolute -translate-x-1/2 left-1/2 ">
          <Globe />
        </div>
      </motion.div>
    </LampContainer>
  );
};

export default ReviewComponent;
