'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PlaceHolderImages from '@/lib/placeholder-images.json';

const floatingElements = [
  { emoji: '👶', top: '15%', right: '10%', delay: 0, duration: 7 },
  { emoji: '🎵', bottom: '25%', left: '8%', delay: 1, duration: 8 },
  { emoji: '👂', top: '20%', left: '15%', delay: 0.5, duration: 6 },
  { emoji: '⭐', bottom: '15%', right: '12%', delay: 2, duration: 9 },
];

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'login-hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/20" />

      {/* Floating elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20 pointer-events-none select-none hidden lg:block"
          style={{ top: el.top, left: el.left, right: el.right, bottom: el.bottom }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay: el.delay,
          }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <Sparkles className="h-4 w-4" />
                Early Hearing Detection & Intervention
              </span>
            </motion.div>

            {/* Headline */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Every Sound Matters.
                </span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-2"
              >
                <span className="text-foreground">
                  Every Milestone Counts.
                </span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              HearStart empowers parents, caregivers, and audiologists to monitor infant hearing health
              from birth through critical developmental stages. Screen early. Track progress. Act with confidence.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="text-base px-8" onClick={onGetStarted}>
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="#features">Learn More</a>
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-sm text-muted-foreground/70 flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              Trusted by audiologists and parents across India
            </motion.p>
          </div>

          {/* Hero image */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 1.05, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.0, delay: 0.4, ease: 'easeOut' as const }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Decorative elements behind image */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-indigo-500/20 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-2xl bg-gradient-to-br from-purple-500/10 to-rose-500/10 -z-20" />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
