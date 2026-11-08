import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Barra fina no topo que mostra o avanço do scroll. Desligada com "reduzir movimento". */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-brand-yellow"
    />
  );
}
