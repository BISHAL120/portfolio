"use client";

import { motion } from "framer-motion";
import { IconCloud as IconCloud1 } from "./cloudIcon";
import InfiniteText from "./infinite-text";

export default function IconCloudDemo() {
  return (
    <div className="bg-black  min-h-screen flex justify-center items-start">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <IconCloud1 />

        <InfiniteText
          /* Less value is Slower */
          speed={0.03}
          text=" Next.js - React - Javascript - Typescript - TailwindCSS - Express - Prisma - MySQL - PostgreSQL - MongoDB - Clerk - Auth0 - Google Cloud - Figma - Git - Github - Android Studio - Docker - Vercel - Firebase - AWS - Google Fonts - Facebook - Sass - Firebase - Supabase - Cursor - Visual Studio Code - Android Studio - Webstorm - Expo -"
        />
      </motion.div>
    </div>
  );
}
