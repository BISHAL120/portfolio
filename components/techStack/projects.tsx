/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include real-time inventory, payment processing, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB"],
    color: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    title: "AI Chat Application",
    description:
      "Real-time chat application powered by AI with natural language processing, sentiment analysis, and smart reply suggestions.",
    tech: ["Next.js", "OpenAI", "WebSocket"],
    color: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    title: "Task Management System",
    description:
      "Collaborative project management tool with drag-and-drop interface, real-time updates, and team collaboration features.",
    tech: ["React", "Express", "PostgreSQL"],
    color: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    title: "Weather Analytics Dashboard",
    description:
      "Interactive weather dashboard with data visualization, forecasting, and location-based insights using modern web technologies.",
    tech: ["Vue.js", "D3.js", "Firebase"],
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 5,
    title: "Social Media Platform",
    description:
      "Modern social platform with real-time messaging, content sharing, and advanced privacy controls built with cutting-edge tech.",
    tech: ["React Native", "GraphQL", "AWS"],
    color: "from-pink-500 to-purple-600",
  },
];

const FloatingSVG = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.svg
        style={{ rotate, scale }}
        className="absolute top-20 right-20 w-32 h-32 opacity-10"
        viewBox="0 0 100 100"
      >
        <motion.path
          d="M50,10 L90,90 L10,90 Z"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </motion.svg>

      <motion.svg
        style={{ rotate: useTransform(rotate, (r) => -r) }}
        className="absolute bottom-40 left-20 w-24 h-24 opacity-20"
        viewBox="0 0 100 100"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="url(#gradient2)"
          strokeWidth="3"
          strokeDasharray="10,5"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

const ProjectCard = ({
  project,
}: {
  project: any;
  index: number;
  containerRef: any;
}) => {
  // Calculate when this specific card should be active

  return (
    <motion.div className="absolute inset-0 w-full">
      <motion.div
        className={`relative h-full bg-gradient-to-br rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <motion.div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl md:text-2xl font-bold text-white">
                  {project.id}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
                  {project.title}
                </h3>
              </div>
            </motion.div>

            <motion.p className="text-white/90 text-sm md:text-lg leading-relaxed mb-4 md:mb-6">
              {project.description}
            </motion.p>
          </div>

          <motion.div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 md:px-3 md:py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 opacity-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 95,35 95,65 50,95 5,65 5,35"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function ProjectsShowcase() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate current project based on scroll position
  const currentProjectFloat = useTransform(
    scrollYProgress,
    [0, 0.8],
    [1, projects.length]
  );
  const currentProject = useTransform(currentProjectFloat, (value) =>
    Math.round(Math.max(1, Math.min(projects.length, value)))
  );
  const currentProjectSpring = useSpring(currentProject, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Spacer to create scroll distance */}
      <div className="h-screen" />

      {/* Sticky container that holds the entire animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="h-full flex items-center justify-center py-20 px-4 md:px-8 lg:px-16 relative">
          <FloatingSVG />

          <div className="max-w-7xl mx-auto w-full">
            {/* Headline with glow effect */}
            <motion.div
              className="text-center mb-12 md:mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{
                  textShadow:
                    "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(59,130,246,0.3), 0 0 60px rgba(139,92,246,0.2)",
                  transition: { duration: 0.3 },
                }}
              >
                Some Projects I&apos;ve Crafted
              </motion.h2>

              <motion.div
                className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "auto", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center h-full">
              {/* Project Counter */}
              <motion.div
                className="lg:w-1/4 text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  <motion.div
                    className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white/10 leading-none"
                    style={{
                      textShadow: "0 0 50px rgba(255,255,255,0.1)",
                    }}
                  >
                    {currentProjectSpring.get().toString().padStart(2, "0")}
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-none"
                    animate={{
                      backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {currentProjectSpring.get().toString().padStart(2, "0")}
                  </motion.div>
                </div>

                <motion.p
                  className="text-gray-400 text-base md:text-lg mt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  of {projects.length} projects
                </motion.p>

                {/* Progress dots */}
                <div className="flex justify-center lg:justify-start gap-2 mt-6">
                  {projects.map((_, index) => (
                    <motion.div
                      key={index}
                      className="w-2 h-2 rounded-full bg-white/20"
                      animate={{
                        backgroundColor:
                          currentProjectSpring.get() === index + 1
                            ? "rgba(255,255,255,0.8)"
                            : "rgba(255,255,255,0.2)",
                        scale:
                          currentProjectSpring.get() === index + 1 ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Project Cards Container */}
              <div className="lg:w-3/4 relative h-80 md:h-96 lg:h-[500px] w-full max-w-2xl mx-auto">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    containerRef={containerRef}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
