import { motion, useInView, Variants } from "motion/react";
import { useRef, ReactNode } from "react";

interface TimelineContentProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  animationNum: number;
  customVariants?: Variants;
  timelineRef: React.RefObject<HTMLElement>;
}

export function TimelineContent({
  children,
  className = "",
  as: Component = "div",
  animationNum,
  customVariants,
  timelineRef,
}: TimelineContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const defaultVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const variants = customVariants || defaultVariants;

  return (
    <motion.div
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {Component === "div" ? (
        children
      ) : (
        <Component className={className}>{children}</Component>
      )}
    </motion.div>
  );
}
