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
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const dashboardSections = [
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
];

export default function DashboardRootPage() {
  return (
    <div className="space-y-6">
       <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your infant's hearing health journey.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dashboardSections.map((section) => (
          <Card
            key={section.href}
            className="flex flex-col justify-between transition-all hover:shadow-md"
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
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={section.href}>
                  Go to Section <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
