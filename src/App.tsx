import { useEffect, useState, lazy, Suspense } from "react";
import Navbar, { INTRO_TOTAL_MS } from "./components/layout/Navbar";

const HeroBackground = lazy(() => import("./components/sections/HeroBackground"));
const Home = lazy(() => import("./pages/Home"));

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
        </Suspense>
      </div>
    </main>
  );
}

export default App;