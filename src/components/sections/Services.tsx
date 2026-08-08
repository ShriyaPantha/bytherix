import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ServiceCard from "../ui/ServiceCard";
import { services } from "../../data/services";

const GAP = 20;

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  /*
   * Responsive visible cards
   */
  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  /*
   * Measure carousel width
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const maxIndex = Math.max(
    services.length - visibleCards,
    0,
  );

  const cardWidth =
    containerWidth > 0
      ? (containerWidth - GAP * (visibleCards - 1)) /
        visibleCards
      : 0;

  /*
   * Automatic movement
   */
  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current >= maxIndex ? 0 : current + 1,
      );
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex]);

  const goNext = () => {
    setActiveIndex((current) =>
      current >= maxIndex ? 0 : current + 1,
    );
  };

  const goPrevious = () => {
    setActiveIndex((current) =>
      current <= 0 ? maxIndex : current - 1,
    );
  };

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
    >
      {/* Very subtle brand background */}
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-green-100/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 max-w-2xl"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />

            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#1e3a8a]">
              What We Provide
            </p>
          </div>

          <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Technology that moves
            <span className="text-[#1e3a8a]"> business forward.</span>
          </h2>

          <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-500">
            From digital products and cloud infrastructure to AI,
            security and creative solutions, we build technology
            that helps businesses grow.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <motion.div
              drag="x"
              dragMomentum={false}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                const threshold = 60;

                if (info.offset.x < -threshold) {
                  goNext();
                } else if (info.offset.x > threshold) {
                  goPrevious();
                }
              }}
              animate={{
                x: -activeIndex * (cardWidth + GAP),
              }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex cursor-grab active:cursor-grabbing"
              style={{
                gap: GAP,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="shrink-0"
                  style={{
                    width: cardWidth || "100%",
                  }}
                >
                  <ServiceCard
                    service={service}
                    index={index}
                    isHovered={hoveredIndex === index}
                    isSelected={selectedIndex === index}
                    onHover={setHoveredIndex}
                    onSelect={setSelectedIndex}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-9 flex items-center justify-between border-t border-slate-100 pt-5">
          {/* Progress */}
          <div className="flex items-center gap-1.5">
            {Array.from({
              length: maxIndex + 1,
            }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to service ${index + 1}`}
                onClick={() => goTo(index)}
                className={`
                  h-1 rounded-full
                  transition-all duration-500
                  ${
                    activeIndex === index
                      ? "w-8 bg-[#1e3a8a]"
                      : "w-2 bg-slate-200 hover:bg-slate-300"
                  }
                `}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous services"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-slate-200
                bg-white
                text-slate-500
                transition-all
                hover:border-[#1e3a8a]
                hover:text-[#1e3a8a]
              "
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next services"
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                bg-slate-950
                text-white
                transition-all
                hover:bg-[#1e3a8a]
              "
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}