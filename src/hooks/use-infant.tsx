'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Infant {
  id: string;
  name: string;
}

interface InfantContextType {
  selectedInfant: Infant | null;
  setSelectedInfant: (infant: Infant | null) => void;
}

const InfantContext = createContext<InfantContextType | undefined>(undefined);

export function InfantProvider({ children }: { children: ReactNode }) {
  const [selectedInfant, setSelectedInfant] = useState<Infant | null>(() => {
    if (typeof window !== 'undefined') {
      const savedInfant = localStorage.getItem('selectedInfant');
      return savedInfant ? JSON.parse(savedInfant) : null;
    }
    return null;
  });

  useEffect(() => {
    if (selectedInfant) {
      localStorage.setItem('selectedInfant', JSON.stringify(selectedInfant));
    } else {
      localStorage.removeItem('selectedInfant');
    }
  }, [selectedInfant]);

  return (
    <InfantContext.Provider value={{ selectedInfant, setSelectedInfant }}>
      {children}
    </InfantContext.Provider>
  );
}

export function useInfant() {
  const context = useContext(InfantContext);
  if (context === undefined) {
    throw new Error('useInfant must be used within an InfantProvider');
  }
  return context;
}
