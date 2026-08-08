import { motion } from "framer-motion";
import type { Service } from "../../data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const accentStyles = {
  cyan: {
    icon: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
    glow: "group-hover:shadow-cyan-500/10",
    dot: "bg-cyan-300",
  },

  purple: {
    icon: "text-purple-300 bg-purple-400/10 border-purple-400/20",
    glow: "group-hover:shadow-purple-500/10",
    dot: "bg-purple-300",
  },

  red: {
    icon: "text-red-300 bg-red-400/10 border-red-400/20",
    glow: "group-hover:shadow-red-500/10",
    dot: "bg-red-300",
  },

  green: {
    icon: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    glow: "group-hover:shadow-emerald-500/10",
    dot: "bg-emerald-300",
  },

  blue: {
    icon: "text-blue-300 bg-blue-400/10 border-blue-400/20",
    glow: "group-hover:shadow-blue-500/10",
    dot: "bg-blue-300",
  },
};

export default function ServiceCard({
  service,
  index,
}: ServiceCardProps) {
  const Icon = service.icon;
  const accent = accentStyles[service.accent];

  return (
    <motion.article
      initial={{
        opacity: 0,
        x: 40,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        transition: {
          duration: 0.25,
        },
      }}
      className={`
        group relative h-full min-h-[300px]
        overflow-hidden rounded-2xl
        border border-white/[0.08]
        bg-[#101522]
        p-6
        shadow-[0_10px_40px_rgba(0,0,0,0.18)]
        transition-shadow duration-500
        ${accent.glow}
      `}
    >
      {/* Ambient glow */}
      <div
        className="
          pointer-events-none absolute
          -right-16 -top-16
          h-40 w-40
          rounded-full
          bg-white/[0.025]
          blur-3xl
          transition-all duration-700
          group-hover:scale-150
        "
      />

      {/* Decorative dots */}
      <div className="absolute right-5 top-5 flex gap-1.5 opacity-40">
        <span className={`h-1 w-1 rounded-full ${accent.dot}`} />
        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span className="h-1 w-1 rounded-full bg-white/20" />
      </div>

      {/* Icon */}
      <motion.div
        whileHover={{ rotate: 6, scale: 1.08 }}
        className={`
          relative mb-8
          flex h-12 w-12 items-center justify-center
          rounded-xl border
          ${accent.icon}
        `}
      >
        <Icon size={21} strokeWidth={1.7} />
      </motion.div>

      {/* Number */}
      <span className="absolute right-6 top-20 text-[10px] font-medium tracking-[0.18em] text-white/20">
        {String(service.id).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="relative">
        <h3 className="mb-3 text-lg font-semibold tracking-tight text-white">
          {service.title}
        </h3>

        <p className="min-h-[72px] text-sm leading-6 text-white/50">
          {service.description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="
                rounded-full
                border border-white/[0.07]
                bg-white/[0.025]
                px-2.5 py-1
                text-[10px]
                text-white/45
              "
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-white/[0.07]" />

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0.35, x: 0 }}
        whileHover={{ opacity: 1, x: 4 }}
        className="absolute bottom-5 right-6 text-white/50"
      >
        →
      </motion.div>
    </motion.article>
  );
}