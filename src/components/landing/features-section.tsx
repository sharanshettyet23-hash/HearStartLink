'use client';

import { Ear, ListChecks, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { LANDING_FEATURES } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  Ear,
  ListChecks,
  Sparkles,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-28 scroll-mt-20">
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
            What{' '}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HearStart
            </span>{' '}
            Offers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for early hearing detection, tracking, and intervention.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {LANDING_FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div key={feature.title} variants={cardVariants}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
                >
                  <Card className={`h-full bg-gradient-to-br ${feature.gradient} border-2 hover:border-primary/20 transition-all duration-300 overflow-hidden relative`}>
                    {/* Corner glow */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${feature.bgColor} opacity-[0.07]`} />

                    <CardHeader className="relative space-y-4">
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center shadow-lg`}
                      >
                        {Icon && <Icon className="h-7 w-7 text-white" />}
                      </motion.div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <ul className="space-y-2">
                        {feature.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${feature.color}`} />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
