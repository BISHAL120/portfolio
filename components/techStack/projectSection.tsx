import { motion } from "framer-motion";
import { DraggableCard } from "./project-image-card";
import Tittle from "../skill/tittle";

const ProjectSection = () => {
  return (
    <div className="my-20 mb-10 md:mb-20">
      {/* Title section */}
      <Tittle
        tittle="PROJECTS"
        showDesc={true}
        desc="Some Projects I&apos;ve Crafted"
      />
      <div className="relative pb-10 space-y-10">
        {/* Animated scroll indicator */}

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`sticky mb-10 p-7 border border-white/10 bg-black top-0 flex flex-col-reverse md:flex-row justify-between items-start `}
          >
            {/* Bottom Scroll Indicator */}
            <motion.div
              className={`${index === 2 ? "hidden" : "block"} absolute z-50 right-0 bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span className="text-xs text-white/72">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-5 h-5"
              >
                <svg
                  className="w-full h-full text-white/80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </motion.div>
            {/* Image Section */}
            <div className="w-full md:w-1/2 md:pr-10 px-2 mt-10">
              {/* Image Cards Section */}
              <DraggableCard />
            </div>
            {/* Project Details Section */}
            <div className="w-full md:w-1/2 md:mt-8 px-2">
              <div>
                {/* Project ID & Title Section */}
                <motion.div className="flex items-center gap-4 mb-4 md:mb-6">
                  {/* Project ID */}
                  <div className="relative">
                    <motion.div
                      className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white/10 leading-none"
                      style={{
                        textShadow: "0 0 50px rgba(255,255,255,0.1)",
                      }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </motion.div>

                    {/* Light Effect for Numbers */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ amount: 1 }}
                      transition={{
                        duration: 1,
                        delay: 1,
                      }}
                      className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-none"
                      animate={{
                        backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
                      }}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </motion.div>
                  </div>

                  {/* Project Title */}
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, scale: 0.2 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    // viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2"
                    >
                      DROFY <br /> A MODERN DROP-SHIPPING PLATFORM
                    </motion.h3>
                  </motion.div>
                </motion.div>

                {/* Project Description Section */}
                <div className="space-y-3">
                  {[
                    "Modern drop-shipping platform for global audience",
                    "User-friendly interface with intuitive design",
                    "Powerful order & inventory management tools",
                    "Comprehensive sales analytics dashboard",
                  ].map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <motion.div
                        className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      <span className="text-white/90 text-sm md:text-lg">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>
                {/* Project Details section */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <motion.h3
                    className="text-xl font-bold text-white mb-2"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    Project Description
                  </motion.h3>
                  <motion.p
                    className="text-white/80 text-sm md:text-base leading-relaxed"
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Modi, veniam repudiandae dicta asperiores ex quisquam
                    excepturi, harum quis tenetur adipisci sit mollitia
                    voluptates veritatis facilis eaque consequatur quae?
                    Accusamus odit laudantium voluptas eius magni quis! Dolorum
                    laborum laudantium quaerat. Minima illo quisquam ullam quod
                    inventore.
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
