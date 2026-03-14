'use client';

import { useEffect, useRef, useState } from 'react';
import { Ear, ListChecks, Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { LANDING_STATS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Ear,
  ListChecks,
  Sparkles,
  Shield,
};

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const stepTime = 1500 / value;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return (
    <span ref={ref} className="text-4xl font-bold tabular-nums text-foreground">
      {count}{suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

export function StatsBar() {
  return (
    <section className="relative py-16 border-y border-gray-200/50 dark:border-gray-700/50 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {LANDING_STATS.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center space-y-2"
            >
              {Icon && <Icon className={`h-7 w-7 mx-auto ${stat.color}`} />}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
