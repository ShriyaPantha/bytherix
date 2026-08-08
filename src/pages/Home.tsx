import { lazy, Suspense } from "react";

const Hero = lazy(() => import("../components/sections/Hero"));
const Services = lazy(() => import("../components/sections/Services"));
const Courses = lazy(() => import("../components/sections/Courses"));

interface HomeProps {
  docked: boolean;
}

function Home({ docked }: HomeProps) {
  return (
    <Suspense fallback={null}>
      <Hero docked={docked} />

      <Services />
      <Courses />
    </Suspense>
  );
}

export default Home;