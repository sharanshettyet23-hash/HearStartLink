'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Baby,
  ClipboardCheck,
  ListChecks,
  Ear,
  AlertTriangle,
  ArrowRight,
  FileText,
  Users,
  Heart,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import PlaceHolderImages from '@/lib/placeholder-images.json';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const dashboardSections = [
  {
    title: 'Manage Infants',
    description: 'Add or select an infant to manage their profile and data.',
    icon: Users,
    href: '/dashboard/infants',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500',
    gradient: 'from-purple-500/10 to-purple-500/5',
    hoverGradient: 'hover:from-purple-500/20 hover:to-purple-500/10',
    borderHover: 'group-hover:border-purple-300',
  },
  {
    title: 'Infant Profile',
    description: "Manage the infant's personal and guardian information.",
    icon: Baby,
    href: '/dashboard/profile',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500',
    gradient: 'from-sky-500/10 to-sky-500/5',
    hoverGradient: 'hover:from-sky-500/20 hover:to-sky-500/10',
    borderHover: 'group-hover:border-sky-300',
  },
  {
    title: 'Risk Factors',
    description: 'Identify and manage high-risk factors for hearing loss.',
    icon: AlertTriangle,
    href: '/dashboard/risk-factors',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500',
    gradient: 'from-rose-500/10 to-rose-500/5',
    hoverGradient: 'hover:from-rose-500/20 hover:to-rose-500/10',
    borderHover: 'group-hover:border-rose-300',
  },
  {
    title: 'Screening',
    description: 'Log screening results and get AI-powered recommendations.',
    icon: ClipboardCheck,
    href: '/dashboard/screening',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500',
    gradient: 'from-teal-500/10 to-teal-500/5',
    hoverGradient: 'hover:from-teal-500/20 hover:to-teal-500/10',
    borderHover: 'group-hover:border-teal-300',
  },
  {
    title: 'Milestones',
    description: 'Track developmental milestones for auditory skills.',
    icon: ListChecks,
    href: '/dashboard/milestones',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
    gradient: 'from-amber-500/10 to-amber-500/5',
    hoverGradient: 'hover:from-amber-500/20 hover:to-amber-500/10',
    borderHover: 'group-hover:border-amber-300',
  },
  {
    title: 'Ling-6 Test',
    description: 'Perform the Ling Six Sound Test and record observations.',
    icon: Ear,
    href: '/dashboard/ling-test',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500',
    gradient: 'from-indigo-500/10 to-indigo-500/5',
    hoverGradient: 'hover:from-indigo-500/20 hover:to-indigo-500/10',
    borderHover: 'group-hover:border-indigo-300',
  },
  {
    title: 'Reports',
    description: 'View a consolidated report of all infant data.',
    icon: FileText,
    href: '/dashboard/reports',
    color: 'text-slate-500',
    bgColor: 'bg-slate-500',
    gradient: 'from-slate-500/10 to-slate-500/5',
    hoverGradient: 'hover:from-slate-500/20 hover:to-slate-500/10',
    borderHover: 'group-hover:border-slate-300',
  },
];

const quickStats = [
  { label: 'Modules', value: 7, icon: Sparkles, color: 'text-blue-500' },
  { label: 'Ling Sounds', value: 6, icon: Ear, color: 'text-indigo-500' },
  { label: 'Milestones', value: 30, suffix: '+', icon: Star, color: 'text-amber-500' },
  { label: 'Made with', value: null, icon: Heart, color: 'text-rose-500', special: 'love' },
];

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const stepTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="text-3xl font-bold tabular-nums">
      {count}{suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

const floatingVariants2 = {
  animate: {
    y: [0, -10, 0],
    x: [0, 8, 0],
    rotate: [0, -8, 8, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

export default function DashboardRootPage() {
  const dashboardImages = PlaceHolderImages.filter(img => img.id.startsWith('dashboard-baby-'));

  return (
    <div className="space-y-10 relative overflow-hidden">
      {/* Floating decorative elements */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 right-10 text-4xl opacity-20 pointer-events-none select-none hidden md:block"
      >
        🍼
      </motion.div>
      <motion.div
        variants={floatingVariants2}
        animate="animate"
        className="absolute top-60 left-5 text-3xl opacity-15 pointer-events-none select-none hidden md:block"
      >
        🧸
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-40 right-20 text-3xl opacity-15 pointer-events-none select-none hidden md:block"
        style={{ animationDelay: '2s' }}
      >
        🎵
      </motion.div>

      {/* Hero Carousel with animated overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Carousel
          className="w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {dashboardImages.map((image) => (
              <CarouselItem key={image.id}>
                <div className="relative h-[400px] md:h-[450px]">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                        {image.description}
                      </h2>
                      <p className="text-white/80 text-sm mt-1">
                        Supporting every step of your infant&apos;s hearing journey
                      </p>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white" />
        </Carousel>
      </motion.div>

      {/* Animated heading */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          An overview of your infant&apos;s hearing health journey.
        </p>
      </motion.div>

      {/* Quick stats row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={cardVariants}
            whileHover={{ scale: 1.05, y: -4 }}
            className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-5 text-center shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <div className="relative">
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
              {stat.special === 'love' ? (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="h-8 w-8 mx-auto text-rose-500 fill-rose-500" />
                </motion.div>
              ) : (
                <AnimatedCounter value={stat.value!} suffix={stat.suffix} />
              )}
              <p className="text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Section heading with decoration */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="flex items-center gap-3"
      >
        <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary to-indigo-500" />
        <h2 className="text-xl font-semibold text-foreground">Explore Modules</h2>
        <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-transparent" />
      </motion.div>

      {/* Staggered card grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {dashboardSections.map((section) => (
          <motion.div key={section.href} variants={cardVariants}>
            <Link
              href={section.href}
              className="block group rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card
                  className={`flex flex-col justify-between h-full transition-all duration-300 bg-gradient-to-br ${section.gradient} ${section.hoverGradient} border-2 ${section.borderHover} overflow-hidden relative`}
                >
                  {/* Decorative corner glow */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${section.bgColor} opacity-[0.07] group-hover:opacity-[0.12] group-hover:scale-150 transition-all duration-500`} />

                  <CardHeader className="space-y-4 relative">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                          {section.title}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {section.description}
                        </CardDescription>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="p-3 rounded-full bg-white shadow-sm group-hover:shadow-lg transition-all duration-300"
                      >
                        <section.icon className={`h-6 w-6 ${section.color} transition-transform duration-300 group-hover:scale-110`} />
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto relative">
                    <div className="flex items-center text-sm font-medium text-primary transition-all duration-300 group-hover:gap-2">
                      <span>Go to Section</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center py-8"
      >
        <p className="text-sm text-muted-foreground/60">
          Every sound matters. Every milestone counts. ✨
        </p>
      </motion.div>
    </div>
  );
}
