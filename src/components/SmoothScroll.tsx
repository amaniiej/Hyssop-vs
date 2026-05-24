import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with the correct modern API properties
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1, // This is the secret to the "buttery" feel
      smoothWheel: true,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}