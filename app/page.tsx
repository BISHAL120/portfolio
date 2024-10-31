"use client";

import { useEffect } from "react";
import Hero from "@/components/hero/page";
import Contact from "@/components/contact/page";

export default function Home() {
  useEffect(() => {
    // Reset scroll position when the page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Contact />
    </>
  );
}
