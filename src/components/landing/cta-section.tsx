'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { EarIcon } from '@/components/icons';

interface CtaSectionProps {
  onGetStarted: () => void;
}

export function CtaSection({ onGetStarted }: CtaSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-shift" />

      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute top-10 left-10 opacity-10"
      >
        <EarIcon className="h-24 w-24 text-white" />
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
        className="absolute bottom-10 right-10 text-5xl opacity-10 pointer-events-none select-none"
      >
        🎵
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Start Your Infant&apos;s Hearing
            <br />
            Journey Today
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join parents and professionals who trust HearStart for early hearing detection and developmental tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="secondary"
              className="text-base px-8 bg-white text-indigo-700 hover:bg-gray-100"
              onClick={onGetStarted}
            >
              Create Free Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <a href="#features">Explore Features</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
