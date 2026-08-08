import { useEffect, useState, lazy, Suspense } from "react";
import Navbar, { INTRO_TOTAL_MS } from "./components/layout/Navbar";
// import Courses from "./components/sections/Courses";
// import Services from "./components/sections/Services";

const HeroBackground = lazy(() => import("./components/sections/HeroBackground"));
const Home = lazy(() => import("./pages/Home"));
// const Services = lazy(() => import("./components/sections/Services"));
// const Courses = lazy(() => import("./components/sections/Courses"));  

function App() {
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDocked(true), INTRO_TOTAL_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen bg-zinc-900 text-white">
      <div className="relative">
        <Suspense fallback={null}>
          <HeroBackground />
        </Suspense>
        <Navbar docked={docked} />
        <Suspense fallback={null}>
          <Home docked={docked} />
          {/* <Services docked={docked} />
          <Courses docked={docked} /> */}
        </Suspense>
      </div>
    </main>
  );
}

export default App;