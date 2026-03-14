'use client';

import { AppLogo } from '@/components/icons';
import { motion } from 'framer-motion';

const quickLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
];

export function LandingFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AppLogo className="h-8 w-8" />
              <span className="text-xl font-bold font-headline">HearStart</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Early hearing screening and intervention for infants.
              Empowering parents and professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              HearStart is designed to support early hearing detection
              following JCIH guidelines, helping ensure every child
              gets the best start in their hearing journey.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200/50 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground/60">
            Every sound matters. Every milestone counts.
          </p>
          <p className="text-xs text-muted-foreground/40 mt-2">
            &copy; {new Date().getFullYear()} HearStart. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
