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
  Users
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const dashboardSections = [
  {
    title: 'Manage Infants',
    description: 'Add or select an infant to manage their profile and data.',
    icon: Users,
    href: '/dashboard/infants',
    color: 'text-purple-500',
  },
  {
    title: 'Infant Profile',
    description: "Manage the infant's personal and guardian information.",
    icon: Baby,
    href: '/dashboard/profile',
    color: 'text-sky-500',
  },
  {
    title: 'Screening',
    description: 'Log screening results and get AI-powered recommendations.',
    icon: ClipboardCheck,
    href: '/dashboard/screening',
    color: 'text-teal-500',
  },
  {
    title: 'Milestones',
    description: 'Track developmental milestones for auditory skills.',
    icon: ListChecks,
    href: '/dashboard/milestones',
    color: 'text-amber-500',
  },
  {
    title: 'Ling-6 Test',
    description: 'Perform the Ling Six Sound Test and record observations.',
    icon: Ear,
    href: '/dashboard/ling-test',
    color: 'text-indigo-500',
  },
  {
    title: 'Risk Factors',
    description: 'Identify and manage high-risk factors for hearing loss.',
    icon: AlertTriangle,
    href: '/dashboard/risk-factors',
    color: 'text-rose-500',
  },
  {
    title: 'Reports',
    description: 'View a consolidated report of all infant data.',
    icon: FileText,
    href: '/dashboard/reports',
    color: 'text-slate-500',
  },
];

export default function DashboardRootPage() {
    const dashboardImages = PlaceHolderImages.filter(img => img.id.startsWith('dashboard-baby-'));

  return (
    <div className="space-y-6">
       <Carousel
        className="w-full rounded-lg overflow-hidden"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {dashboardImages.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative h-56">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  data-ai-hint={image.imageHint}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                   <h2 className="text-2xl font-semibold text-white">{image.description}</h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>

       <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your infant's hearing health journey.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardSections.map((section) => (
          <Link href={section.href} key={section.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg">
            <Card
              className="flex flex-col justify-between h-full transition-all hover:shadow-md hover:bg-accent"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                  <section.icon className={`h-8 w-8 ${section.color}`} />
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center text-sm font-medium text-primary">
                  Go to Section <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
