import {
  getInitialProgramsForProgramPage,
  getSingleProgram,
} from "@/api/web/program.action";
import React from "react";
import type { Metadata } from "next";
import ProgramDetailPage from "@/app/(main)/programs/[slug]";
import type { IProgramAppPageProps } from "@/page-components/programs/utils/types";
import applicationConfig from "@/config";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
  searchParams,
}: IProgramAppPageProps): Promise<Metadata> {
  const program = await getSingleProgram(params.slug);

  if (!program) {
    return {
      title: "404 | WiseAdmit",
      description: "Page not found",
    };
  }

  const title = `Programs | ${program.name} | ${program.university?.name}`;
  const description = `Learn more about ${program.name} programs in China by ${program.university?.name} in English for international students. Apply to the top universities in China.`;
  const endPoint = `programs/${params.slug}`;
  const url = `${applicationConfig.frontendUrlConfig}/${endPoint}`;
  const mappedSubDisciplines = program.sub_discipline.map((m) => m.name);
  const keywords: string[] = [
    program.name,
    program.university?.name,
    "study in China",
    "international students",
    ...mappedSubDisciplines,
    program.discipline.name,
    "English-taught program",
    "Chinese university",
    "higher education",
    "study abroad",
    "scholarship opportunities",
    "admissions",
    program.university.location,
    "academic programs",
    "international education",
  ];
  const pageImage =
    `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${program.cover_key}` ||
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

  const programs = await getInitialProgramsForProgramPage(query);

  return programs.data.map((program) => ({
    slug: program.slug,
  }));
}

async function Page(props: IProgramAppPageProps) {
  const { slug } = props.params;

  const program = await getSingleProgram(slug);
  if (!program) {
    notFound();
  }

  return (
    <>
      <ProgramDetailPage program={program} />
    </>
  );
}

export default Page;
