"use client";
import React from "react";
import { HeroParallax } from "../ui/hero-parallax";
import { motion } from "framer-motion";

export default function ProjectParallax() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, bounce: 0.2 }}
      className=""
    >
      <HeroParallax products={products} />
    </motion.div>
  );
}
export const products = [
  {
    title: "Tasker",
    link: "https://tasker.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project6.png",
  },
  {
    title: "Admin Dashboard",
    link: "https://moderndashboard.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/dashboard1.png",
  },
  {
    title: "Eco Bazar",
    link: "https://ecobazar.monerulislambishal.xyz/",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project2.png",
  },
  {
    title: "Ecommerce",
    link: "https://website1.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project1.png",
  },
  {
    title: "Hidra AR",
    link: "https://vr.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project5.png",
  },
  {
    title: "Plumber X",
    link: "https://plumber.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project4.png",
  },
  {
    title: "Shoe Store",
    link: "https://nike.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project3.png",
  },
  {
    title: "Tasker",
    link: "https://tasker.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project6.png",
  },
  {
    title: "Hidra VR",
    link: "https://vr.monerulislambishal.xyz",
    thumbnail:
      "https://publicimage1234.s3.ap-southeast-1.amazonaws.com/projectsImage/project5.png",
  },
  /*  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "/projectImage/project7.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "/projectImage/project8.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "/projectImage/project9.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "/projectImage/project10.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "/projectImage/project11.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "/projectImage/project12.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "/projectImage/project13.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "/projectImage/project14.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "/projectImage/project15.png",
  }, */
];
