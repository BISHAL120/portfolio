"use client";

import { motion } from "framer-motion";

export default function Details({ className }: { className?: string }) {
  const text =
    "I am a full stack developer with a passion for building scalable and efficient web applications. I am a quick learner & I'm always looking for new challenges. With a strong foundation in both frontend and backend development, I am dedicated to crafting seamless user experiences and driving innovation in the tech industry.";

  const words = text.split(" ");

  return (
    <div className={className}>
      <motion.div
        className="text-neutral-400 text-lg text-center mt-4 md:w-3/4 mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: 0.9 + index * 0.1,
              ease: [0.65, 0, 0.75, 1],
            }}
          >
            {word + " "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
