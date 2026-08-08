import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Signal } from "lucide-react";
import type { Course } from "../../data/courses";

interface CourseCardProps {
  course: Course;
  index: number;

  // Focus / interaction props
  isFocused: boolean;
  isAnyFocused: boolean;
  onFocus: (id: number) => void;
  onBlur: () => void;
}

const accentStyles = {
  navy: {
    color: "var(--color-navy)",
    soft: "var(--brand-blue-soft)",
  },

  green: {
    color: "var(--color-green)",
    soft: "var(--brand-green-soft)",
  },

  red: {
    color: "var(--color-red)",
    soft: "var(--brand-red-soft)",
  },
};

export default function CourseCard({
  course,
  index,
  isFocused,
  isAnyFocused,
  onFocus,
  onBlur,
}: CourseCardProps) {
  const Icon = course.icon;
  const accent = accentStyles[course.accent];

  return (
    <motion.article
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
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={{
        scale:
          isAnyFocused && !isFocused
            ? 0.97
            : 1,

        opacity:
          isAnyFocused && !isFocused
            ? 0.72
            : 1,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
        transition: {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      onMouseEnter={() => onFocus(course.id)}
      onMouseLeave={onBlur}
      onFocus={() => onFocus(course.id)}
      className="
        group
        relative
        flex
        h-full
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-[22px]
        border
        border-[var(--border-primary)]
        bg-[var(--surface-primary)]
        shadow-[var(--shadow-card)]
        transition-colors
        duration-500
      "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* =================================================
          TOP ACCENT LINE
      ================================================= */}

      <motion.div
        className="absolute left-0 top-0 z-30 h-[3px] w-full origin-left"
        style={{
          backgroundColor: accent.color,
        }}
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: isFocused ? 1 : 0,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* =================================================
          VISUAL AREA
      ================================================= */}

      <div
        className="
          relative
          h-[205px]
          overflow-hidden
          transition-colors
          duration-500
        "
        style={{
          backgroundColor: accent.soft,
        }}
      >
        {/* -----------------------------------------------
            Background glow
        ------------------------------------------------ */}

        <motion.div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
          "
          style={{
            backgroundColor: accent.color,
          }}
          animate={{
            scale: isFocused ? 1.25 : 1,
            opacity: isFocused ? 0.11 : 0.07,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* -----------------------------------------------
            Decorative dots
        ------------------------------------------------ */}

        <motion.div
          className="absolute left-8 top-8 h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: accent.color,
          }}
          animate={{
            scale: isFocused ? 1.5 : 1,
          }}
          transition={{
            duration: 0.35,
          }}
        />

        <motion.div
          className="absolute right-12 top-10 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"
          animate={{
            y: isFocused ? -4 : 0,
          }}
          transition={{
            duration: 0.4,
          }}
        />

        <motion.div
          className="absolute bottom-8 left-12 h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: accent.color,
          }}
          animate={{
            x: isFocused ? 4 : 0,
          }}
          transition={{
            duration: 0.4,
          }}
        />

        {/* =================================================
            MAIN ILLUSTRATION
        ================================================= */}

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            y: isFocused ? -5 : 0,
            scale: isFocused ? 1.06 : 1,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="
              relative
              flex
              h-28
              w-36
              items-center
              justify-center
              rounded-2xl
              border
              bg-white/75
              shadow-sm
              backdrop-blur-sm
              dark:bg-slate-900/60
            "
            style={{
              borderColor: `${accent.color}20`,
            }}
          >
            {/* Main icon */}
            <motion.div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${accent.color}12`,
              }}
              animate={{
                rotate: isFocused ? -3 : 0,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <Icon
                size={42}
                strokeWidth={1.6}
                style={{
                  color: accent.color,
                }}
              />
            </motion.div>

            {/* ---------------------------------------------
                Floating mini block - left
            ---------------------------------------------- */}

            <motion.span
              className="
                absolute
                -left-4
                top-5
                h-6
                w-6
                rounded-lg
                border
                bg-white
                shadow-sm
                dark:bg-slate-800
              "
              style={{
                borderColor: `${accent.color}25`,
              }}
              animate={{
                x: isFocused ? -5 : 0,
                y: isFocused ? -4 : 0,
                rotate: isFocused ? -6 : 0,
              }}
              transition={{
                duration: 0.45,
              }}
            />

            {/* ---------------------------------------------
                Floating mini block - right
            ---------------------------------------------- */}

            <motion.span
              className="
                absolute
                -right-4
                bottom-5
                h-7
                w-7
                rounded-lg
                border
                bg-white
                shadow-sm
                dark:bg-slate-800
              "
              style={{
                borderColor: `${accent.color}25`,
              }}
              animate={{
                x: isFocused ? 5 : 0,
                y: isFocused ? 4 : 0,
                rotate: isFocused ? 6 : 0,
              }}
              transition={{
                duration: 0.45,
              }}
            />

            {/* ---------------------------------------------
                Floating dot
            ---------------------------------------------- */}

            <motion.span
              className="
                absolute
                -right-2
                -top-3
                h-3
                w-3
                rounded-full
              "
              style={{
                backgroundColor: accent.color,
              }}
              animate={{
                y: isFocused
                  ? [-2, -8, -2]
                  : [0, -4, 0],
              }}
              transition={{
                duration: isFocused ? 1.6 : 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* =================================================
            CATEGORY BADGE
        ================================================= */}

        <motion.div
          className="absolute bottom-4 left-5"
          animate={{
            y: isFocused ? -2 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <span
            className="
              rounded-full
              border
              bg-white/85
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              backdrop-blur-md
              dark:bg-slate-900/80
            "
            style={{
              color: accent.color,
              borderColor: `${accent.color}22`,
            }}
          >
            {course.category}
          </span>
        </motion.div>

        {/* =================================================
            FOCUS / ARROW CIRCLE
        ================================================= */}

        <motion.div
          className="
            absolute
            right-5
            top-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-md
            dark:bg-slate-900
          "
          initial={{
            opacity: 0,
            scale: 0.6,
            y: 6,
          }}
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.6,
            y: isFocused ? 0 : 6,
          }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            animate={{
              x: isFocused ? 0 : -2,
              y: isFocused ? 0 : 2,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <ArrowUpRight
              size={17}
              style={{
                color: accent.color,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="flex flex-1 flex-col p-6">
        {/* Title */}

        <motion.h3
          className="
            text-[17px]
            font-bold
            leading-tight
            tracking-[-0.02em]
            text-[var(--text-primary)]
          "
          animate={{
            x: isFocused ? 2 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {course.title}
        </motion.h3>

        {/* Description */}

        <p
          className="
            mt-3
            min-h-[48px]
            text-[13px]
            leading-6
            text-[var(--text-secondary)]
          "
        >
          {course.description}
        </p>

        {/* =================================================
            META
        ================================================= */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-4
            border-t
            border-[var(--border-secondary)]
            pt-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5
              text-[11px]
              font-medium
              text-[var(--text-secondary)]
            "
          >
            <Clock3 size={14} />
            {course.duration}
          </div>

          <div
            className="
              flex
              items-center
              gap-1.5
              text-[11px]
              font-medium
              text-[var(--text-secondary)]
            "
          >
            <Signal size={14} />
            {course.level}
          </div>
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div className="mt-5 flex items-center justify-between">
          <div>
            <span
              className="
                block
                text-[10px]
                font-medium
                uppercase
                tracking-[0.14em]
                text-[var(--text-muted)]
              "
            >
              Course Fee
            </span>

            <span
              className="
                mt-1
                block
                text-[16px]
                font-bold
                text-[var(--text-primary)]
              "
            >
              {course.price}
            </span>
          </div>

          {/* View Course */}

          <motion.button
            type="button"
            className="
              relative
              flex
              items-center
              gap-2
              overflow-hidden
              rounded-full
              border
              px-4
              py-2
              text-xs
              font-semibold
            "
            style={{
              borderColor: `${accent.color}30`,
              color: accent.color,
            }}
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <span>View Course</span>

            <motion.span
              animate={{
                x: isFocused ? 2 : 0,
              }}
              whileHover={{
                x: 4,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <ArrowUpRight size={15} />
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* =================================================
          BOTTOM ACCENT GLOW
      ================================================= */}

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left"
        style={{
          backgroundColor: accent.color,
        }}
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={{
          scaleX: isFocused ? 1 : 0,
          opacity: isFocused ? 0.8 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </motion.article>
  );
}