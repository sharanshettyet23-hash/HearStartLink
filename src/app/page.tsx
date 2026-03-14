'use client';

import { useState } from 'react';
import { LandingNavbar } from '@/components/landing/landing-navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { StatsBar } from '@/components/landing/stats-bar';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { CtaSection } from '@/components/landing/cta-section';
import { LandingFooter } from '@/components/landing/landing-footer';
import { AuthDialog } from '@/components/landing/auth-dialog';

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('signup');

  const openAuth = (tab: 'login' | 'signup') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen">
      <LandingNavbar
        onLoginClick={() => openAuth('login')}
        onSignUpClick={() => openAuth('signup')}
      />

      <main>
        <HeroSection onGetStarted={() => openAuth('signup')} />
        <StatsBar />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <CtaSection onGetStarted={() => openAuth('signup')} />
      </main>

      <LandingFooter />

      <AuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        defaultTab={authTab}
      />
    </div>
  );
}
