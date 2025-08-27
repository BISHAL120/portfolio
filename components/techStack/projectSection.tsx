import { motion } from "framer-motion";
import { DraggableCard } from "./project-image-card";

const ProjectSection = () => {
  return (
    <div className="my-20 mb-10 md:mb-20">
      {/* Title section */}
      <motion.div className="text-center mb-12 md:mb-20">
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
          className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "auto", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>

      {/* Projects shocase section  */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-start">
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
                  01
                </motion.div>

                {/* Light Effect for Numbers */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-none"
                  animate={{
                    backgroundPosition: ["0% 0%", "0% 100%", "0% 0%"],
                  }}
                >
                  01
                </motion.div>
              </div>

              {/* Project Title */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2">
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
            <div className="mt-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Project Description
              </h3>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi,
              veniam repudiandae dicta asperiores ex quisquam excepturi, harum
              quis tenetur adipisci sit mollitia voluptates veritatis facilis
              eaque consequatur quae? Accusamus odit laudantium voluptas eius
              magni quis! Dolorum laborum laudantium quaerat. Minima illo
              quisquam ullam quod inventore.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
