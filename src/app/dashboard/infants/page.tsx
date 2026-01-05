'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useInfant } from '@/hooks/use-infant';
import { cn } from '@/lib/utils';

interface Infant {
  id: string;
  name: string;
}

export default function InfantsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { selectedInfant, setSelectedInfant } = useInfant();
  const [infants, setInfants] = useState<Infant[]>([]);
  const [newInfantName, setNewInfantName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    setIsFetching(true);
    const q = query(collection(db, 'infants'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const infantsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Infant[];
        setInfants(infantsData);
        setIsFetching(false);
      },
      (error) => {
        console.error('Error fetching infants: ', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch infants. Please try again.',
        });
        setIsFetching(false);
      }
    );

    return () => unsubscribe();
  }, [user, toast]);

  const handleAddInfant = async () => {
    if (!user || !newInfantName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Invalid Name',
        description: 'Please enter a valid name for the infant.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'infants'), {
        userId: user.uid,
        name: newInfantName,
        createdAt: new Date().toISOString(),
      });
      toast({
        title: 'Infant Added',
        description: `${newInfantName} has been added successfully.`,
      });
      setNewInfantName('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error adding infant: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add infant. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectInfant = (infant: Infant) => {
    setSelectedInfant(infant);
    router.push('/dashboard');
  };

  const renderContent = () => {
    if (isFetching) {
      return (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (infants.length > 0) {
      return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {infants.map((infant) => (
            <Card
              key={infant.id}
              className={cn(
                'p-4 flex items-center justify-between cursor-pointer',
                selectedInfant?.id === infant.id && 'border-primary'
              )}
              onClick={() => handleSelectInfant(infant)}
            >
              <span className="font-medium">{infant.name}</span>
              <Button variant="outline" size="sm">
                {selectedInfant?.id === infant.id ? 'Selected' : 'Select'}
              </Button>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h3 className="text-lg font-medium text-muted-foreground">No infants found</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Click the &quot;Add Infant&quot; button to get started.
        </p>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Manage Infants</CardTitle>
          <CardDescription>
            Add a new infant or select one to view their dashboard.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Add Infant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Infant</DialogTitle>
              <DialogDescription>
                Enter the name of the new infant to add them to your profile.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                id="name"
                placeholder="Infant's Name"
                value={newInfantName}
                onChange={(e) => setNewInfantName(e.target.value)}
              />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleAddInfant} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
