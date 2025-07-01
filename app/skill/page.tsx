"use client";

import { motion } from "framer-motion";
import { IconCloud as IconCloud1 } from "./cloudIcon";
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
  "nextdotjs",
  //   "cssmodules",
  //   "dart",
  //   "java",
  //   "nodedotjs",
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
  /*   const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  ); */

  return (
    <div className="bg-black  min-h-screen flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <IconCloud1 iconSlugs={slugs} />
        {/* <div className="w-[500px] h-[500px] mx-auto mb-10">
          <IconCloud images={images} />
        </div> */}
        <InfiniteText
          /* Less value is Slower */
          speed={0.03}
          text=" Next.js - React - Javascript - Typescript - TailwindCSS - Express - Prisma - MySQL - PostgreSQL - MongoDB - Clerk - Auth0 - Google Cloud - Figma - Git - Github - Android Studio - Docker - Vercel - Firebase - AWS - Google Fonts - Facebook - Sass - Firebase - Supabase - Cursor - Visual Studio Code - Android Studio - Webstorm - Expo -"
        />
      </motion.div>
    </div>
  );
}
