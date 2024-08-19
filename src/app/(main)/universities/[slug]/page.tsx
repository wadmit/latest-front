import React from "react";
import type { Metadata } from "next";
import UniversityDetailPage from "@/app/(main)/universities/[slug]";
import type { IUniversityAppPageProps } from "@/page-components/universities/utils/types";
import {
  getInitialUniversitiesForUniversityPage,
  getSingleUniversity,
} from "@/api/web/university.action.";
import applicationConfig from "@/config";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
  searchParams,
}: IUniversityAppPageProps): Promise<Metadata> {
  const university = await getSingleUniversity(params.slug);

  if (!university) {
    return {
      title: "404 | WiseAdmit",
      description: "Page not found",
    };
  }
  const title = `Universities | ${university.name}`;
  const description = `
        Study in China at
        ${university.name}. Find out all the info for international students regarding admissions, accommodation and rankings.`;
  const endPoint = `universities/${params.slug}`;
  const url = `${applicationConfig.frontendUrlConfig}/${endPoint}`;
  const keywords: string[] = [
    university.name,
    "study in China",
    "international students",
    "English-taught program",
    "Chinese university",
    "higher education",
    "study abroad",
    "scholarship opportunities",
    "admissions",
    university.location,
    "academic programs",
    "international education",
  ];
  const pageImage =
    `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${university.cover_key}` ||
    `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/utils/wiseadmit.png`;

  return {
    title,
    description,
    keywords: keywords,
    metadataBase: new URL(applicationConfig.frontendUrlConfig),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: pageImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [pageImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateStaticParams() {
  const page = 1;
  const limit = 10;

  const query = new URLSearchParams();
  query.append("page", page.toString());
  query.append("limit", limit.toString());

  const universities = await getInitialUniversitiesForUniversityPage(query);

  return universities.data.map((university) => ({
    slug: university.slug,
  }));
}

async function Page(props: IUniversityAppPageProps) {
  const { slug } = props.params;

  const university = await getSingleUniversity(slug);
  if (!university) {
    notFound();
  }

  return (
    <>
      <UniversityDetailPage university={university} />{" "}
    </>
  );
}

export default Page;
