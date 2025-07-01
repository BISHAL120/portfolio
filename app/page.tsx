"use client";

import Hero from "@/components/hero/page";
import ProjectParallax from "@/components/projects/project";
import ReviewComponent from "@/components/review/review";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectParallax />
      <ReviewComponent />
    </>
  );
}
