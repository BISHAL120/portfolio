"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

interface TechProps {
  name: string;
  icon: string;
  color: string;
}

const techStack = {
  frontend: [
    { name: "JavaScript", icon: "🟨", color: "bg-yellow-500" },
    { name: "TypeScript", icon: "🔷", color: "bg-blue-500" },
    { name: "React", icon: "⚛️", color: "bg-cyan-400" },
    { name: "Next.js", icon: "⚫", color: "bg-white" },
    { name: "Redux", icon: "🟣", color: "bg-purple-600" },
    { name: "Tailwind CSS", icon: "🌊", color: "bg-teal-400" },
    { name: "Framer Motion", icon: "🎭", color: "bg-pink-500" },
    { name: "SASS", icon: "🌸", color: "bg-pink-400" },
    { name: "Bootstrap", icon: "🅱️", color: "bg-purple-700" },
  ],
  backend: [
    { name: "Node.js", icon: "🟢", color: "bg-green-600" },
    { name: "Express.js", icon: "⚫", color: "bg-gray-700" },
  ],
  database: [
    { name: "PostgreSQL", icon: "🐘", color: "bg-blue-700" },
    { name: "MongoDB", icon: "🍃", color: "bg-green-500" },
    { name: "Prisma", icon: "🔺", color: "bg-gray-300" },
  ],
  tools: [
    { name: "Git", icon: "🔧", color: "bg-orange-500" },
    { name: "GitHub", icon: "🐙", color: "bg-gray-800" },
    { name: "Postman", icon: "📬", color: "bg-orange-600" },
    { name: "Docker", icon: "🐳", color: "bg-blue-500" },
  ],
};

const TechItem = ({ tech, index }: { tech: TechProps; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.05,
        y: -8,
        rotateY: 5,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300"
        animate={{
          boxShadow: isHovered
            ? "0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px rgba(255, 255, 255, 0.1)"
            : "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <motion.div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${tech.color}`}
          animate={{
            rotate: isHovered ? 360 : 0,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          {tech.icon}
        </motion.div>
        <span className="text-white font-medium text-sm md:text-base">
          {tech.name}
        </span>
      </motion.div>
      <motion.div className="absolute hidden group-hover:flex h-1 -bottom-0 -z-10 inset-x-0 bg-gradient-to-r from-transparent via-white to-transparent w-3/5 mx-auto" />
    </motion.div>
  );
};

const TechSection = ({
  title,
  techs,
}: {
  title: string;
  techs: TechProps[];
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className="mb-12 md:mb-16">
      <motion.h3
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-400 mb-6 md:mb-8 tracking-wider"
        initial={{ opacity: 0, x: -100, rotateY: -15 }}
        whileInView={{
          opacity: 1,
          x: 0,
          rotateY: 0,
          transition: {
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true, margin: "-100px" }}
        whileHover={{
          scale: 1.05,
          color: "#ffffff",
          transition: { duration: 0.3 },
        }}
      >
        {title}
      </motion.h3>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {techs.map((tech, techIndex) => (
          <TechItem key={tech.name} tech={tech} index={techIndex} />
        ))}
      </motion.div>
    </motion.div>
  );
};

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute top-20 left-10 w-2 h-2 bg-blue-900/20 rounded-full"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-20 w-1 h-1 bg-purple-500/30 rounded-full"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-cyan-500/25 rounded-full"
      />
      <motion.div
        style={{ y: y2, rotate: rotate }}
        className="absolute bottom-20 right-1/3 w-2 h-2 bg-pink-500/20 rounded-full"
      />
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX, opacity }}
      />

      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed top-6 right-6 w-12 h-12 z-50"
        style={{ opacity }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="stroke-gray-700"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className="stroke-white"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            style={{
              pathLength: scaleX,
            }}
            initial={{ pathLength: 0 }}
          />
        </svg>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <span className="text-white text-xs font-bold">✨</span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default function TechStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <>
      <ParallaxBackground />
      <ScrollProgress />
      <motion.div
        ref={containerRef}
        // style={{ y: backgroundY }}
        className="min-h-screen bg-black py-12 md:py-20 px-4 md:px-8 lg:px-16 relative"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-center mb-12 md:mb-20"
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-6"
              initial={{ scale: 0.8, rotateY: -15 }}
              whileInView={{
                scale: 1,
                rotateY: 0,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  stiffness: 100,
                },
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
            >
              <motion.span
                className="text-2xl md:text-3xl"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 2,
                }}
              >
                ✨
              </motion.span>
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white tracking-wider">
                MY STACK
              </h2>
            </motion.div>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {Object.entries(techStack).map(([category, techs]) => (
              <TechSection
                key={category}
                title={category.toUpperCase()}
                techs={techs}
                // index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
