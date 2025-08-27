"use client";

import { motion } from "framer-motion";

export default function Details({ className }: { className?: string }) {
  const text = `Seeking a challenging position in Full Stack Development to leverage my expertise in React, 
JavaScript, and MongoDB. Aiming to contribute to innovative projects at the intersection of 
scalable web applications, user-centric dashboards, and practical problem-solving in fields such as 
SaaS platforms, eCommerce solutions, and admin panel development.`;

  const words = text.split(" ");

  return (
    <div className={className}>
      <motion.div
        className="text-neutral-400 text-lg text-start md:w-3/4 mt-4"
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
