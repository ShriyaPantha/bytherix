import { lazy, Suspense } from "react";

const Hero = lazy(() => import("../components/sections/Hero"));

interface HomeProps {
  docked: boolean;
}

function Home({ docked }: HomeProps) {
  return (
    <Suspense fallback={null}>
      <Hero docked={docked} />
    </Suspense>
  );
}

export default Home;