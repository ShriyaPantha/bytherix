import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Service } from "../../data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}

const accentStyles = {
  blue: {
    color: "#1e3a8a",
    soft: "#eef3ff",
    border: "rgba(30, 58, 138, 0.20)",
    line: "bg-[#1e3a8a]",
  },

  green: {
    color: "#16a34a",
    soft: "#edf9f1",
    border: "rgba(22, 163, 74, 0.20)",
    line: "bg-[#16a34a]",
  },

  red: {
    color: "#dc2626",
    soft: "#fff0f0",
    border: "rgba(220, 38, 38, 0.20)",
    line: "bg-[#dc2626]",
  },
};

export default function ServiceCard({
  service,
  index,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [showDrag, setShowDrag] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 300,
    damping: 25,
    mass: 0.4,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 300,
    damping: 25,
    mass: 0.4,
  });

  const accent = accentStyles[service.accent];

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setShowDrag(true);
    onHover(index);
  };

  const handleMouseLeave = () => {
    setShowDrag(false);
    onHover(null);
  };

  const handleSelect = () => {
    onSelect(index);
  };

  const showArrow = isHovered || isSelected;

  return (
    <motion.div
      ref={cardRef}
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -7,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelect}
      className="group relative h-[390px] cursor-pointer"
    >
      <div
        className={`
          relative flex h-full flex-col overflow-hidden
          rounded-[22px]
          border
          bg-white
          px-6 pb-5 pt-6
          transition-all duration-500
          ${
            isSelected
              ? "shadow-[0_22px_60px_rgba(15,23,42,0.12)]"
              : "shadow-[0_8px_30px_rgba(15,23,42,0.055)]"
          }
        `}
        style={{
          borderColor: isSelected
            ? accent.border
            : "rgba(15, 23, 42, 0.09)",
        }}
      >
        {/* Brand color top line */}
        <div
          className={`
            absolute left-6 right-6 top-0 h-[3px]
            rounded-b-full
            ${accent.line}
            transition-all duration-500
            ${isSelected ? "opacity-100" : "opacity-60"}
          `}
        />

        {/* Very subtle corner detail */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-30 blur-2xl transition-all duration-500 group-hover:opacity-50"
          style={{
            backgroundColor: accent.color,
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            duration: 0.25,
          }}
          className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border"
          style={{
            backgroundColor: accent.soft,
            borderColor: accent.border,
            color: accent.color,
          }}
        >
          <service.icon size={21} strokeWidth={1.8} />
        </motion.div>

        {/* Number */}
        <span
          className="absolute right-6 top-7 text-[10px] font-semibold tracking-[0.16em]"
          style={{
            color: accent.color,
            opacity: 0.28,
          }}
        >
          {String(service.id).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="relative z-10 mt-7">
          <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-slate-950">
            {service.title}
          </h3>

          <p className="mt-3 text-[13px] leading-[1.75] text-slate-500">
            {service.description}
          </p>
        </div>

        {/* Tags */}
        <div className="relative z-10 mt-auto flex flex-wrap gap-2 pt-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                border border-slate-200
                bg-slate-50
                px-2.5 py-1
                text-[10px]
                font-medium
                text-slate-500
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom action */}
        <div className="relative z-10 mt-5 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.13em] text-slate-500">
              View Services
            </span>

            <AnimatePresence mode="wait">
              {showArrow ? (
                <motion.span
                  key="visible"
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.65,
                    x: -8,
                  }}
                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                  style={{
                    backgroundColor: accent.color,
                  }}
                >
                  <ArrowUpRight size={15} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span
                  key="hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  className="h-8 w-8"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* WebTech-style DRAG cursor */}
        <AnimatePresence>
          {showDrag && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.45,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.45,
              }}
              transition={{
                duration: 0.2,
              }}
              style={{
                left: smoothX,
                top: smoothY,
              }}
              className="
                pointer-events-none
                absolute z-30
                flex h-[72px] w-[72px]
                -translate-x-1/2
                -translate-y-1/2
                items-center justify-center
                rounded-full
                bg-slate-950
                text-white
                shadow-[0_10px_30px_rgba(15,23,42,0.22)]
              "
            >
              <div className="flex flex-col items-center leading-none">
                <span className="text-[9px] font-semibold tracking-[0.14em]">
                  DRAG
                </span>

                <span className="mt-1 text-[12px] text-white/60">
                  ↗
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}