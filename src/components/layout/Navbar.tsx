import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import logo from "../../assets/logo.png";
import MobileMenu from "./MobileMenu";
import "./Navbar.css";

interface NavbarProps {
  docked: boolean;
}

const WORD_ONE = "Bytherix";
const WORD_TWO = "Technology";
const FULL_LENGTH = WORD_ONE.length + WORD_TWO.length;

const letterVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.015, duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
};

const LETTERS_DONE_AT = FULL_LENGTH * 0.015 + 0.18;
const UNDERLINE_START = 0;
const UNDERLINE_DURATION = 0.18; // fast underline
const UNDERLINE_DONE_AT = UNDERLINE_START + UNDERLINE_DURATION;
const HOLD_AFTER_FULL_REVEAL = 0.1;

export const INTRO_TOTAL_MS = Math.round(
  (Math.max(LETTERS_DONE_AT, UNDERLINE_DONE_AT) + HOLD_AFTER_FULL_REVEAL) * 1000
);

const LINKS = ["Company", "Services", "Products", "Portfolios", "Shop", "Contact"];

const linkVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.025, duration: 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const DOCK_TRANSITION = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

const Navbar = ({ docked }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-20 flex items-center justify-between px-6 py-5">
        <motion.div
          layout
          transition={DOCK_TRANSITION}
          className={
            docked
              ? "static flex items-center gap-3"
              : "fixed inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-zinc-900"
          }
        >
          <motion.div
            layout
            transition={DOCK_TRANSITION}
            className={
              docked
                ? "h-14 w-14 overflow-hidden rounded-full ring-2 ring-white/10"
                : "h-32 w-32 sm:h-44 sm:w-44 overflow-hidden rounded-full"
            }
          >
            <img
              src={logo}
              alt="Bytherix Technology logo"
              className="h-full w-full object-cover scale-125"
            />
          </motion.div>

          <motion.div
            layout="position"
            transition={DOCK_TRANSITION}
            className={docked ? "flex flex-col items-start" : "flex flex-col items-center"}
          >
            <motion.div
              layout
              transition={DOCK_TRANSITION}
              className="flex font-bold tracking-wide text-white"
              style={{
                fontSize: docked ? "1.4rem" : "clamp(2.5rem, 7vw, 4.5rem)",
                fontFamily: "'Chakra Petch', sans-serif",
              }}
            >
              {WORD_ONE.split("").map((char, i) => (
                <motion.span
                  key={`w1-${i}`}
                  layout
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ layout: DOCK_TRANSITION }}
                  className={`inline-block ${i === 0 ? "text-logo-red" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              layout
              transition={DOCK_TRANSITION}
              className="flex font-medium tracking-[0.15em] text-gray-400 uppercase"
              style={{
                fontSize: docked ? "0.65rem" : "clamp(0.9rem, 2vw, 1.4rem)",
                fontFamily: "'Chakra Petch', sans-serif",
              }}
            >
              {WORD_TWO.split("").map((char, i) => (
                <motion.span
                  key={`w2-${i}`}
                  layout
                  custom={WORD_ONE.length + i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ layout: DOCK_TRANSITION }}
                  className={`inline-block ${i === 0 ? "text-logo-red" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <AnimatePresence>
              {!docked && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 1 }}
                  animate={{
                    scaleX: 1,
                    opacity: 1,
                    transition: {
                      delay: UNDERLINE_START,
                      duration: UNDERLINE_DURATION,
                      ease: "linear",
                    },
                  }}
                  exit={{
                    scaleX: 0,
                    opacity: 0,
                    transition: { duration: 0.15, ease: "easeIn" },
                  }}
                  style={{
                    originX: 0,
                    boxShadow: "0 0 12px 2px rgba(220,38,38,0.7)",
                  }}
                  className="mt-2 h-[3px] w-full bg-logo-red"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Right side: MENU pill or expanded row (your original design) */}
        <motion.div
          initial={false}
          animate={{ opacity: docked ? 1 : 0 }}
          transition={{ duration: 0.2, delay: docked ? 0.1 : 0 }}
          className="flex items-center gap-6"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="links-row"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="flex items-center gap-6"
              >
                {/* Desktop links only */}
                <nav className="hidden items-center gap-6 md:flex">
                  {LINKS.map((link, i) => (
                    <motion.a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-bold uppercase tracking-wide text-white transition-colors hover:text-logo-green"
                    >
                      {link}
                    </motion.a>
                  ))}
                </nav>

                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="hidden rounded-full bg-logo-blue px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 md:inline-block"
                >
                  Get a Quote
                </a>

                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 1L15 15M15 1L1 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="menu-pill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                onClick={() => setMenuOpen(true)}
                className="flex items-center gap-3 rounded-full border border-white/20 py-1.5 pl-4 pr-1.5 text-white transition-colors hover:border-logo-green"
              >
                <span className="text-xs font-semibold tracking-widest">MENU</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M0 1H14M0 5H14M0 9H14" stroke="white" strokeWidth="1.3" />
                  </svg>
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Mobile slide-in menu (separate component) */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={LINKS}
      />
    </>
  );
};

export default Navbar;