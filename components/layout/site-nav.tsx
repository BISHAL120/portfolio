"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-white/[0.06] bg-[#070708]/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="shell flex h-[74px] items-center justify-between">
          <Link href="/" className="group flex items-center gap-3" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/[0.04] font-mono text-[11px] tracking-tight text-accent transition-colors group-hover:border-accent/50">
              MB
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-paper/90 sm:block">
              {site.name}
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active =
                link.href === "/projects"
                  ? pathname.startsWith("/projects")
                  : link.href === "/contact"
                    ? pathname.startsWith("/contact")
                    : false;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    active ? "text-paper" : "text-muted hover:text-paper"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.resume}
              download
              className="hidden h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-paper transition-colors hover:border-white/35 hover:bg-white/[0.06] sm:inline-flex"
            >
              Résumé
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-paper md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#070708]/97 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex h-full flex-col justify-between pb-10 pt-28">
              <div className="flex flex-col gap-2">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.45 }}
                  >
                    <Link
                      href={link.href}
                      className="block border-b border-white/10 py-4 text-4xl font-medium tracking-tight"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="space-y-4">
                <a href={site.resume} download className="btn btn-primary w-full">
                  Download résumé
                </a>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} className="hover:text-paper">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
