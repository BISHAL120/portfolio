"use client";

import AboutBody from "@/components/about/aboutBody";
import Hero from "@/components/hero/page";
import SkillSection from "@/components/skill/skillSection";
import TittleV2 from "@/components/skill/tittleV2";
import ProjectSection from "@/components/techStack/projectSection";


export default function Home() {
  return (
    <>
      <Hero />
      <SkillSection />
      <TittleV2 text="ABOUT ME" />
      <AboutBody />
      <ProjectSection />
      {/* <ProjectParallax />
      <ReviewComponent /> */}
    </>
  );
}
