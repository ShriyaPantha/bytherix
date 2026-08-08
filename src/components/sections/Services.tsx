import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "../ui/ServiceCard";
import { services } from "../../data/services";

const AUTOPLAY_DELAY = 3500;

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener("resize", updateVisibleCards);

    return () =>
      window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current >= services.length - visibleCards) {
          return 0;
        }

        return current + 1;
      });
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [visibleCards]);

  const cardWidth = useMemo(() => {
    if (visibleCards === 1) return "100%";
    if (visibleCards === 2) return "50%";
    return "33.333333%";
  }, [visibleCards]);

  return (
    <section
      id="services"
      className="
        relative overflow-hidden
        bg-[#05070d]
        py-24 sm:py-28 lg:py-32
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/4
          h-[500px] w-[700px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/[0.035]
          blur-[140px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300">
            What We Provide
          </p>

          <h2
            className="
              text-3xl font-semibold
              tracking-tight text-white
              sm:text-4xl lg:text-5xl
            "
          >
            Solutions built for
            <span className="text-white/40"> what comes next.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
            From digital products to intelligent systems, we provide
            technology solutions designed to help businesses build,
            scale and stay ahead.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{
              x: `-${activeIndex * (100 / visibleCards)}%`,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {services.map((service, index) => (
              <div
                key={service.id}
                className="shrink-0 px-2.5 sm:px-3"
                style={{
                  width: cardWidth,
                }}
              >
                <ServiceCard
                  service={service}
                  index={index}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-between">
          {/* Progress */}
          <div className="flex gap-1.5">
            {Array.from({
              length: Math.ceil(services.length / visibleCards),
            }).map((_, index) => {
              const isActive =
                Math.floor(activeIndex / visibleCards) === index;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to service group ${index + 1}`}
                  onClick={() =>
                    setActiveIndex(
                      Math.min(
                        index * visibleCards,
                        services.length - visibleCards,
                      ),
                    )
                  }
                  className={`
                    h-1 rounded-full transition-all duration-500
                    ${
                      isActive
                        ? "w-8 bg-cyan-300"
                        : "w-2 bg-white/20"
                    }
                  `}
                />
              );
            })}
          </div>

          {/* Counter */}
          <span className="text-[11px] tracking-[0.18em] text-white/25">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(services.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}