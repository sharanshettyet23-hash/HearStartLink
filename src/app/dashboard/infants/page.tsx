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
  DocumentData,
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
import { Loader2, PlusCircle, UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

interface Infant {
  id: string;
  name: string;
}

export default function InfantsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
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
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch infants.',
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
      setIsDialogOpen(false); // Close dialog on success
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add infant.',
      });
    } finally {
      setIsLoading(false);
    }
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
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
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
                {isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {isFetching ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : infants.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {infants.map((infant) => (
              <Card key={infant.id} className="p-4 flex items-center justify-between">
                <span className="font-medium">{infant.name}</span>
                <Button variant="outline" size="sm">Select</Button>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h3 className="text-lg font-medium text-muted-foreground">No infants found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Click 'Add Infant' to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
