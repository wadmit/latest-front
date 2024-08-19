import { getNews, getSingleNews } from "@/api/web/news.actions";
import applicationConfig from "@/config";
import SingleNewsHome from "@/page-components/news/single-news/SingleNewsHome";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const news = await getNews({
    page: 1,
    limit: 10,
    searchTerm: "",
  });

  const allNews = [
    news?.data?.data?.featuredNews,
    ...news?.data?.data?.news,
  ].filter(Boolean);
  return allNews.map((blog) => ({
    slug: blog.slug,
  }));
}

export const revalidate = 86400; // 24 hours

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const newsData = await getSingleNews({ slug: params.slug });

  if (!newsData?.news) {
    return {
      title: "WiseAdmit news",
      description: "WiseAdmit news section",
    };
  }

  const { title, meta, tags } = newsData.news;
  const endPoint = `news/${params.slug}`;
  const url = `${applicationConfig.frontendUrlConfig}/${endPoint}`;
  const pageImage =
    `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${newsData.news.cover_key}` ||
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

export default async function Page({ params }: Params) {
  const newsData = await getSingleNews({ slug: params.slug });

  if (!newsData?.news) {
    notFound();
  }

  return (
    <>
      <SingleNewsHome
        news={newsData.news}
        suggestedNews={newsData.suggestedNews}
      />
    </>
  );
}
