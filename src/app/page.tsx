import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LoginForm } from '@/components/login-form';
import { SignUpForm } from '@/components/signup-form';
import { AppLogo } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AuthenticationPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'login-hero');

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-[400px] space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <AppLogo className="h-12 w-12" />
              <h1 className="text-4xl font-bold font-headline">HearStart</h1>
            </div>
            <p className="text-muted-foreground">
              Welcome! Your journey to monitoring early hearing starts here.
            </p>
          </div>
          <Card>
            <CardHeader>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <CardContent className="p-4">
                    <LoginForm />
                  </CardContent>
                </TabsContent>
                <TabsContent value="signup">
                  <CardContent className="p-4">
                    <SignUpForm />
                  </CardContent>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="hidden lg:block relative">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </div>
  );
}
