import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconPhonePlus,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export function FloatingDockComponent() {
  const links = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-300" />,
      href: "/",
    },

    {
      title: "Projects",
      icon: <IconTerminal2 className="h-full w-full text-neutral-300" />,
      href: "/projects",
    },
    {
      title: "Contact",
      icon: <IconPhonePlus className="h-full w-full text-neutral-300" />,
      href: "/contact",
    },
    {
      title: "Review",
      icon: <IconNewSection className="h-full w-full text-neutral-300" />,
      href: "/review",
    },
    {
      title: "Skill",
      icon: <IconExchange className="h-full w-full text-neutral-300" />,
      href: "/skill",
    },

    {
      title: "Twitter",
      icon: <IconBrandX className="h-full w-full text-neutral-300" />,
      href: "https://x.com/monerulmd5",
      newTab: true,
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-full w-full text-neutral-300" />,
      href: "https://github.com/BISHAL120",
      newTab: true,
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-neutral-300" />,
      href: "https://www.linkedin.com/in/monerulmd5",
      newTab: true,
    },
  ];
  return (
    <div className="fixed bottom-4 right-4 md:bottom-0 md:right-0 md:left-0 flex items-center  md:justify-center md:h-[7rem] w-full z-50">
      <FloatingDock
        mobileClassName="md:translate-y-20 left-10 "
        desktopClassName="w-auto"
        items={links}
      />
    </div>
  );
}
