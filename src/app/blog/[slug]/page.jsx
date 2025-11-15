import { PrismaClient } from "@prisma/client";
import BlogDetailsPage from "@/page_components/BlogDetailsPage";

const prisma = new PrismaClient();

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { seo: true },
  });

  const seo = blog?.seo;

  return {
    title: seo?.title || "Blog",
    description: seo?.description || "",
    keywords: seo?.keywords || [],
    alternates: { canonical: seo?.canonicalUrl || "" },
    openGraph: {
      title: seo?.title,
      description: seo?.description,
      images: [seo?.ogImage],
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { seo: true },
  });

  if (!blog) {
    return (
      <div className="p-20 text-center text-gray-500">
        Blog not found
      </div>
    );
  }

  return <BlogDetailsPage blog={blog} />;
}
