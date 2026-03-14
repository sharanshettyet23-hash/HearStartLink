'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { LANDING_TESTIMONIALS } from '@/lib/constants';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function TestimonialsSection() {
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
            Trusted by{' '}
            <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Parents & Professionals
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what parents, caregivers, and audiologists are saying about HearStart.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {LANDING_TESTIMONIALS.map((testimonial, index) => (
            <motion.div key={index} variants={cardVariants}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
              >
                <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 hover:border-primary/20 transition-all duration-300">
                  {/* Decorative quote */}
                  <div className="absolute top-4 right-4 opacity-[0.06]">
                    <Quote className="h-16 w-16" />
                  </div>

                  <CardContent className="pt-6 space-y-4 relative">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1, type: 'spring' as const, stiffness: 200, damping: 15 }}
                        >
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-muted-foreground leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
