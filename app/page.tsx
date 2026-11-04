import { Hero } from "@/components/hero/hero";
import {
  About,
  ContactCta,
  Principles,
  Skills,
  WorkPreview,
} from "@/components/home/sections";
import { StackMarquee } from "@/components/ui/stack-marquee";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee items={site.stack} />
      <About />
      <Skills />
      <WorkPreview />
      <Principles />
      <ContactCta />
    </>
  );
}
