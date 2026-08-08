import { lazy, Suspense } from "react";

const Hero = lazy(() => import("../components/sections/Hero"));
const Services = lazy(() => import("../components/sections/Services"));

interface HomeProps {
  docked: boolean;
}

function Home({ docked }: HomeProps) {
  return (
    <Suspense fallback={null}>
      <Hero docked={docked} />

      <Services />
    </Suspense>
  );
}

export default Home;