'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { gridContainerVariants } from '@/lib/motion/grid-animations';

type GridAnimationProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function GridAnimation({ children, className = '', delay = 0 }: GridAnimationProps) {
  const variants = {
    ...gridContainerVariants,
    visible: {
      ...gridContainerVariants.visible,
      transition: {
        ...gridContainerVariants.visible.transition,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      data-framer-motion="true"
      initial="hidden"
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
      variants={variants}
      viewport={{ once: true, margin: '-50px' }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}
