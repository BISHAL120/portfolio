import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
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
      title: "Skill",
      icon: <IconExchange className="h-full w-full text-neutral-300" />,
      href: "/skill",
    },
    /* {
      title: "Contact",
      icon: <IconPhonePlus className="h-full w-full text-neutral-300" />,
      href: "/contact",
    }, */
    {
      title: "Review",
      icon: <IconNewSection className="h-full w-full text-neutral-300" />,
      href: "/review",
    },
    {
      title: "Whatsapp",
      icon: <IconBrandWhatsapp className="h-full w-full text-neutral-300" />,
      href: "https://wa.me/+8801312604691",
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
    <div className="fixed bottom-[calc(100%-4rem)] right-5 md:bottom-0 md:right-0 md:left-0 flex items-center  md:justify-center md:h-[7rem] w-full z-50">
      <FloatingDock
        mobileClassName="md:translate-y-20 w-full justify-end"
        desktopClassName="w-auto"
        items={links}
      />
    </div>
  );
}
