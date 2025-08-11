'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div ref={ref}>
      {/* Heading Section */}
      <motion.h3
        className="text-3xl md:text-4xl font-bold mb-6 text-white"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeInUp}
      >
        Hey! I&apos;m{" "}
        <span className="relative">
          <span className="bg-gradient-to-r from-violet-500 to-orange-500 bg-clip-text text-transparent font-bold">
            BISHAL
          </span>
          <span
            className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-orange-500 rounded-full"
            style={{ width: "100%" }}
          ></span>
        </span>
      </motion.h3>

      {/* Paragraphs with animation */}
      {[
        `I'm Monerul Islam Bishal, a Full Stack Web Developer with 3+ years of coding experience & 2+ years of freelance experience. I specialize in building clean, responsive, and dynamic websites using HTML, CSS, JavaScript, React, Next.js, Node.js, Prisma, MongoDB, and PostgreSQL. Passionate about building scalable and efficient web applications. I am a quick learner & I'm always looking for new challenges.`,
        `Over the past few years, I’ve worked on diverse projects ranging from SaaS platforms, eCommerce dashboards, and portfolio websites to admin panels for ISPs and custom CMS systems. I have a deep understanding of component-driven development, state management, and secure API integration.`,
        `My development stack is focused on modern technologies like React, Next.js (including server-side rendering and API routes), Prisma ORM, MongoDB, PostgreSQL, and Firebase. I’ve also explored mobile development using React Native and am continually expanding my knowledge in cloud technologies and performance optimization.`,
        `I believe in clean code, intuitive UX, and scalable architecture. Whether working solo or collaborating with a team, I’m committed to delivering high-quality solutions that solve real-world problems. Let’s connect and build something impactful together!`,
      ].map((text, index) => (
        <motion.p
          key={index}
          className="text-lg leading-7 mb-5 text-gray-200"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          transition={{ delay: 0.2 + index * 0.2 }}
        >
          {text}
        </motion.p>
      ))}
    </div>
  );
}
