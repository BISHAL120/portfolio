"use client";

import { motion } from "framer-motion";
import { IconCloud } from "./cloudIcon";
import InfiniteText from "./infinite-text";

const slugs = [
  "typescript",
  "javascript",
  "react",
  "cursor",
  "android",
  "expo",
  "html5",
  "css3",
  "eslint",
  "tailwindcss",
  "bootstrap",
  "express",
  "prisma",
  "mongoose",
  "zod",
  "validator",
  "amazonaws",
  "postgresql",
  "cssmodules",
  "reactquery",
  "reactrouter",
  "reactbootstrap",
  "createreactapp",
  "awslambda",
  "clerk",
  "auth0",
  "googlecloud",
  "webstorm",
  "mysql",
  "google",
  "googlechrome",
  "googlefonts",
  "facebook",
  "sass",
  "mongodb",
  "firebase",
  "supabase",
  "vercel",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "androidstudio",
  "figma",
  //   "cssmodules",
  //   "dart",
  //   "java",
  //   "nodedotjs",
  //   "nextdotjs",
  //   "nginx",
  //   "testinglibrary",
  //   "jest",
  //   "cypress",
  //   "jira",
  //   "gitlab",
  //   "sonarqube",
  //   "flutter",
];

export default function IconCloudDemo() {
  return (
    <div className="bg-neutral-900 min-h-screen flex pt-10 justify-center items-center md:items-start">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full max-w-screen"
      >
        <IconCloud iconSlugs={slugs} />
        <InfiniteText
          speed={0.05}
          text="Next.js - React - Javascript - Typescript - TailwindCSS - Express - Prisma - MySQL - PostgreSQL - MongoDB - Clerk - Auth0 - Google Cloud - Figma - Git - Github - Android Studio - Docker - Vercel - Firebase - AWS - Google Fonts - Facebook - Sass - Firebase - Supabase - Cursor - Visual Studio Code - Android Studio - Webstorm"
        />
      </motion.div>
    </div>
  );
}
