import React from "react";
// Adjust the import path to your shadcn Tabs component location if different
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

type Feature = { id?: number; title: string; description?: string };
type Specification = { id?: number; key: string; value: string };
type Faq = { id?: number; question: string; answer: string };

type SubService = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  imageUrl?: string | null;
  applications?: any; // Json
  features?: Feature[] | null;
  specifications?: Specification[] | null;
  faqs?: Faq[] | null;
  warrantyComponents?: any; // Json
};

type ServiceWithSubs = {
  id: number;
  title: string;
  slug: string;
  shortTitle?: string;
  subServices: SubService[];
};

/**
 * ServiceOptions
 * - Props: a Service object that contains subServices array.
 * - Renders a tab for each subservice with all requested fields.
 */
export function ServiceOptions({ service }: { service: ServiceWithSubs }) {
  if (!service || !service.subServices || service.subServices.length === 0) {
    return <div>No subservices available.</div>;
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold">{service.title}</h2>
        {service.shortTitle && <p className="text-sm text-muted-foreground">{service.shortTitle}</p>}
      </header>

      <Tabs defaultValue={String(service.subServices[0].id)}>
        <TabsList className="overflow-x-auto">
          {service.subServices.map((sub) => (
            <TabsTrigger key={sub.id} value={String(sub.id)} className="whitespace-nowrap">
              {sub.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {service.subServices.map((sub) => (
          <TabsContent key={sub.id} value={String(sub.id)} className="pt-4">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Image */}
              <div className="md:col-span-1">
                {sub.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={sub.imageUrl} alt={sub.title} className="w-full rounded-md object-cover" />
                ) : (
                  <div className="h-48 w-full rounded-md bg-muted flex items-center justify-center text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Main details */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="text-xl font-medium">{sub.title}</h3>
                  <p className="text-xs text-muted-foreground">Slug: <code>{sub.slug}</code></p>
                </div>

                {sub.description && <p className="text-sm leading-relaxed">{sub.description}</p>}

                {/* Applications */}
                {sub.applications && (
                  <section className="rounded-md border p-4">
                    <h4 className="font-semibold">Applications</h4>
                    <pre className="mt-2 max-h-40 overflow-auto text-xs bg-transparent">{JSON.stringify(sub.applications, null, 2)}</pre>
                  </section>
                )}

                {/* Features */}
                {sub.features && sub.features.length > 0 && (
                  <section className="rounded-md border p-4">
                    <h4 className="font-semibold">Features</h4>
                    <ul className="mt-2 space-y-2 list-disc ml-5">
                      {sub.features.map((f, i) => (
                        <li key={f.id ?? i}>
                          <strong>{f.title}</strong>
                          {f.description && <div className="text-sm text-muted-foreground">{f.description}</div>}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Specifications */}
                {sub.specifications && sub.specifications.length > 0 && (
                  <section className="rounded-md border p-4">
                    <h4 className="font-semibold">Specifications</h4>
                    <div className="mt-2 overflow-auto">
                      <table className="w-full text-sm">
                        <tbody>
                          {sub.specifications.map((s, i) => (
                            <tr key={s.id ?? i} className="border-b">
                              <td className="py-2 font-medium w-1/3">{s.key}</td>
                              <td className="py-2">{s.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                )}

                {/* FAQs */}
                {sub.faqs && sub.faqs.length > 0 && (
                  <section className="rounded-md border p-4">
                    <h4 className="font-semibold">FAQs</h4>
                    <div className="mt-2 space-y-2">
                      {sub.faqs.map((faq, i) => (
                        <details key={faq.id ?? i} className="rounded-md border p-3">
                          <summary className="cursor-pointer font-medium">{faq.question}</summary>
                          <div className="mt-2 text-sm text-muted-foreground">{faq.answer}</div>
                        </details>
                      ))}
                    </div>
                  </section>
                )}

                {/* Warranty Components */}
                {sub.warrantyComponents && (
                  <section className="rounded-md border p-4">
                    <h4 className="font-semibold">Warranty Components</h4>
                    <pre className="mt-2 max-h-40 overflow-auto text-xs bg-transparent">{JSON.stringify(sub.warrantyComponents, null, 2)}</pre>
                  </section>
                )}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

/*
Example usage (replace fetch with your data fetching):
<ServiceOptions service={serviceFromDb} />
*/
