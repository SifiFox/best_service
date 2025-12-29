'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type ScrollAnimationProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function ScrollAnimation({
  children,
  delay = 0,
  className = '',
}: ScrollAnimationProps) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      data-framer-motion="true"
      initial={{ opacity: 0, y: 30 }}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
