'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type StaggerAnimationProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  itemDelay?: number;
};

export default function StaggerAnimation({
  children,
  className = '',
  staggerDelay = 0.1,
  itemDelay = 0.1,
}: StaggerAnimationProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: itemDelay,
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
      variants={containerVariants}
      viewport={{ once: true, margin: '-50px' }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}
