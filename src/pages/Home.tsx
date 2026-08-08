import { lazy, Suspense } from "react";

const Hero = lazy(() => import("../components/sections/Hero"));
const AboutSection = lazy( () => import("../components/sections/about/AboutSection")
);
const Services = lazy(() => import("../components/sections/Services"));

interface HomeProps {
  docked: boolean;
}

function Home({ docked }: HomeProps) {
  return (
    <Suspense fallback={null}>
      <Hero docked={docked} />
 <AboutSection />
      <Services />
    </Suspense>
  );
}

export default Home;