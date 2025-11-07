import services from '@/data/services';
import { notFound } from 'next/navigation';
import ServiceDetails from '@/components/ServiceDetails';
import Link from 'next/link';

// Dynamic metadata based on slug
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const { seo } = service;

  return {
    title: seo?.title || service.title,
    description: seo?.description || service.shortDescription,
    keywords: seo?.keywords?.join(', ') || undefined,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetails service={service} />;
}
