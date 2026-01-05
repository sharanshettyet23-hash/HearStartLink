'use client';

import { useParams } from 'next/navigation';

export default function InfantPage() {
  const { infantId } = useParams();

  return (
    <div>
      <h1>Infant Page</h1>
      <p>Infant ID: {infantId}</p>
    </div>
  );
}
