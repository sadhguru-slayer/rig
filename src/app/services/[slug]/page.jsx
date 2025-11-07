import services from '@/data/services';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ServiceDetails from '@/components/ServiceDetails';

export default async function ServicePage({ params }) {
  const { slug } = await params;

  // Find the service by slug
  const service = services.find((s) => s.slug === slug);

  // If service not found, show 404
  if (!service) {
    notFound();
  }

  return (
    <ServiceDetails service={service}/>
  );
}
