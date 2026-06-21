"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/content";
import Logo from "./Logo";

const EASE = [0.16, 1, 0.3, 1] as const;
const T = { duration: 0.55, ease: EASE };

export default function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu once we cross into the desktop layout
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ---------- Desktop / tablet (≥ md) — floating pill ---------- */}
      <div className="hidden md:block">
        <div className="shell py-5">
          <motion.div
            layout
            transition={T}
            className={
              condensed
                ? "relative mx-auto flex w-fit items-center gap-3 p-2"
                : "relative grid grid-cols-[1fr_auto_1fr] items-center"
            }
          >
            {/* Frosted pill background — fades in when condensed */}
            <motion.div
              aria-hidden
              initial={false}
              animate={{ opacity: condensed ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border border-black/5 bg-white/60 shadow-lg shadow-black/5 backdrop-blur-md"
            />

            {/* Logo */}
            <motion.a
              layout="position"
              transition={T}
              href="#top"
              aria-label="Friday Foundry"
              className={`relative ${condensed ? "pl-1" : "justify-self-start"}`}
            >
              <Logo size={34} />
            </motion.a>

            {/* Nav links */}
            <motion.nav
              layout="position"
              transition={T}
              className={`relative ${condensed ? "" : "justify-self-center"}`}
            >
              <ul
                className={`flex items-center gap-7 rounded-full px-5 py-2.5 transition-colors duration-300 ${
                  condensed ? "bg-transparent" : "bg-ff-gray-4"
                }`}
              >
                {nav.links.map((link, i) => (
                  <li key={link.label} className="flex items-center gap-7">
                    {i > 0 && (
                      <span className="h-4 w-px bg-ff-ink/25" aria-hidden />
                    )}
                    <a
                      href={link.href}
                      className="text-[15px] font-medium text-ff-black transition-opacity hover:opacity-60"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>

            {/* CTA */}
            <motion.a
              layout="position"
              transition={T}
              whileHover={{ y: -2 }}
              href={nav.cta.href}
              className={`relative rounded-full bg-ff-lavender px-6 py-3 text-[15px] font-medium text-ff-gray-2 ${
                condensed ? "" : "justify-self-end"
              }`}
            >
              {nav.cta.label}
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ---------- Mobile (< md) — logo + hamburger, dropdown menu ---------- */}
      <div className="shell py-4 md:hidden">
        <div className="relative flex items-center justify-between rounded-full border border-black/5 bg-white/70 px-4 py-2.5 shadow-lg shadow-black/5 backdrop-blur-md">
          <a href="#top" aria-label="Friday Foundry" className="relative">
            <Logo size={30} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-9 w-9 place-items-center"
          >
            <span className="relative block h-[10px] w-5">
              <motion.span
                animate={{ y: menuOpen ? 4 : 0, rotate: menuOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-ff-ink"
              />
              <motion.span
                animate={{ y: menuOpen ? -4 : 0, rotate: menuOpen ? -45 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-ff-ink"
              />
            </span>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-2 rounded-3xl border border-black/5 bg-white/80 p-2 shadow-lg shadow-black/5 backdrop-blur-md"
            >
              <ul className="flex flex-col">
                {nav.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-ff-black transition-colors hover:bg-black/5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={nav.cta.href}
                onClick={() => setMenuOpen(false)}
                className="mt-1 block rounded-full bg-ff-lavender px-6 py-3 text-center text-base font-medium text-ff-gray-2"
              >
                {nav.cta.label}
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
