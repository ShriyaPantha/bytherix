import { useState } from "react";
import { motion } from "framer-motion";

import CourseCard from "../ui/CourseCard";
import { courses } from "../../data/courses";

import {
  coursesContainerVariants,
  courseHeadingVariants,
  courseSubtitleVariants,
} from "../../utils/motionVariants";

export default function Courses() {
  const [focusedCourse, setFocusedCourse] = useState<number | null>(null);

  return (
    <section
      id="courses"
      className="relative overflow-hidden bg-[var(--bg-primary)] py-20 transition-colors duration-500 sm:py-24 lg:py-28"
    >
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      {/* Navy / Blue glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-[15%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-blue-50/70
          blur-[120px]
          dark:bg-blue-950/20
        "
      />

      {/* Green glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-52
          top-[35%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-emerald-50/70
          blur-[110px]
          dark:bg-emerald-950/20
        "
      />

      {/* Red glow */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-[-180px]
          left-[35%]
          h-[350px]
          w-[350px]
          rounded-full
          bg-red-50/60
          blur-[110px]
          dark:bg-red-950/20
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADING
        ================================================= */}

        <div className="mb-12 max-w-3xl lg:mb-14">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            variants={courseHeadingVariants}
          >
            <span
              className="
                mb-3
                inline-block
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-[var(--color-green)]
              "
            >
              Learn With Bytherix
            </span>

            <h2
              className="
                text-4xl
                font-bold
                tracking-[-0.045em]
                text-[var(--text-primary)]
                transition-colors
                duration-500
                sm:text-5xl
                lg:text-[52px]
              "
            >
              Explore Our Courses
            </h2>
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            variants={courseSubtitleVariants}
            className="
              mt-4
              max-w-2xl
              text-base
              leading-7
              text-[var(--text-secondary)]
              transition-colors
              duration-500
              sm:text-lg
            "
          >
            Learn in-demand skills with hands-on projects
            and industry-relevant content.
          </motion.p>
        </div>

        {/* =================================================
            COURSE GRID
        ================================================= */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          variants={coursesContainerVariants}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            perspective: "1200px",
          }}
        >
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              isFocused={focusedCourse === course.id}
              isAnyFocused={focusedCourse !== null}
              onFocus={setFocusedCourse}
              onBlur={() => setFocusedCourse(null)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}