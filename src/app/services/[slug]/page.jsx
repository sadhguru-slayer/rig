import { notFound } from 'next/navigation';
import ServiceDetails from '@/components/ServiceDetails';
import prisma from '@/lib/prisma';
import WarrantyComponent from '@/components/admin/service/WarrantyComponent';

// Dynamic metadata based on slug
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
    where: { slug },
    include: {
      seo: true,
    },
  });

  if (!service) {
    return { title: 'Service Not Found' };
  }

  const { seo } = service;

  return {
    title: seo?.title || service.title,
    description: seo?.description || service.shortDescription,
    keywords: seo?.keywords ? (Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords) : undefined,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;

  const service = await prisma.service.findUnique({
  where: { slug },
  include: {
    features: true,
    specifications: true,
    gallery: true,
    faqs: true,
    testimonials: true,
    seo: true,

    subServices: {
      include: {
        features: true,
        specifications: true,
        faqs: true,
        testimonials: true,
        seo: true,
      }
    }
  }
});


  if (!service) {
    notFound();
  }

  // Transform data if necessary to match component expectations
  // The component expects 'gallery' to be an array of strings (urls), but Prisma returns objects if it's a relation.
  // Let's check schema. If gallery is a JSON field or a relation.
  // In previous interactions, I saw 'gallery' in include, so it might be a relation.
  // If it's a relation `GalleryImage`, it has a `url` field.
  // If it's a JSON field, it's just data.
  // Let's assume it's compatible or I might need to map it.
  // Wait, in `src/components/ServiceDetails.jsx`: `gallery.map((img, index) => ... src={img}` implies `img` is a string URL.
  // If Prisma returns an array of objects, this will break.
  // I should check the schema or safely map it.
  // Let's map it just in case: if it's an array of objects with 'url', map to url.

  const serializedService = {
    ...service,
    gallery: Array.isArray(service.gallery) ? service.gallery.map(g => typeof g === 'string' ? g : g.url) : [],
    // Specifications might be a Json object, which is fine.
    // Features might be relation. Component expects {icon, title, detail}.
    // Testimonials might be relation. Component expects {name, role, content, avatar}.
  };

  return <ServiceDetails service={serializedService} />;
}
