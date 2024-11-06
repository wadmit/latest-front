import { getBlogs, getSingleBlog } from "@/api/web/blog.actions";
import applicationConfig from "@/config";
import SingleBlogHome from "@/page-components/blog/single-blog/SingleBlogHome";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const blogs = await getBlogs({
    page: 1,
    limit: 10,
    searchTerm: "",
  });

  const allBlogs = [
    blogs?.data?.data?.featuredBlog,
    ...blogs?.data?.data?.blogs,
  ].filter(Boolean);
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export const revalidate = 86400; // 24 hours

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const blogData = await getSingleBlog({ slug: params.slug });

  if (!blogData?.blog) {
    return {
      title: "WiseAdmit blog",
      description: "WiseAdmit blog section",
    };
  }

  const { title, meta, tags } = blogData.blog;
  const endPoint = `blogs/${params.slug}`;
  const url = `${applicationConfig.frontendUrlConfig}/${endPoint}`;
  const pageImage =
    `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${blogData.blog.cover_key}` ||
    `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/utils/wiseadmit.png`;

  return {
    title,
    description: meta,
    keywords: tags,
    metadataBase: new URL(applicationConfig.frontendUrlConfig),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: meta,
      url,
      images: [{ url: pageImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta,
      images: [pageImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const blogData = await getSingleBlog({ slug: params.slug });


  if (!blogData?.blog) {
    notFound();
  }

  return (
    <SingleBlogHome
      blog={blogData.blog}
      suggestedBlogs={blogData.suggestedBlog}
    />
  );
}
