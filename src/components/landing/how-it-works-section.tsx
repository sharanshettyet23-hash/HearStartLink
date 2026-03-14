'use client';

import {
  UserPlus,
  Baby,
  AlertTriangle,
  ClipboardCheck,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LANDING_STEPS } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  Baby,
  AlertTriangle,
  ClipboardCheck,
  FileText,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50/50 dark:bg-gray-900/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How It{' '}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes. Track progress for months.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' as const }}
            className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary/30 via-blue-500/30 to-indigo-500/30"
            style={{ transformOrigin: 'left' }}
          />

          {/* Connecting line - mobile */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeInOut' as const }}
            className="md:hidden absolute left-8 top-16 bottom-8 w-0.5 bg-gradient-to-b from-primary/30 via-blue-500/30 to-indigo-500/30"
            style={{ transformOrigin: 'top' }}
          />

          <div className="grid md:grid-cols-5 gap-8 md:gap-4 relative">
            {LANDING_STEPS.map((item, index) => {
              const Icon = iconMap[item.icon];
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                    type: 'spring' as const,
                    stiffness: 150,
                    damping: 15,
                  }}
                  className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3"
                >
                  {/* Step circle */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="relative flex-shrink-0"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg">
                      {Icon && <Icon className="h-7 w-7 text-white" />}
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-gray-950 flex items-center justify-center text-xs font-bold text-primary border-2 border-primary">
                      {item.step}
                    </div>
                  </motion.div>

                  {/* Step text */}
                  <div className="md:mt-4">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
