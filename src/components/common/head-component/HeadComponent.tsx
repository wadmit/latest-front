import { Metadata, ResolvingMetadata } from "next";
import applicationConfig from "@/config";

type MetadataParams = {
  title: string;
  description: string;
  endPoint?: string;
  pageImg?: string;
  keywords?: string[];
};

export function generateMetadata({
  title,
  description,
  endPoint = "",
  pageImg,
  keywords = [
    "study in China",
    "international students",
    "English-taught program",
    "Chinese university",
    "higher education",
    "study abroad",
    "scholarship opportunities",
    "admissions",
    "academic programs",
    "international education",
  ],
}: MetadataParams): Metadata {
  const url =
    endPoint === "/"
      ? `${applicationConfig.frontendUrlConfig}`
      : `${applicationConfig.frontendUrlConfig}/${endPoint}`;
  const pageImage =
    pageImg ||
    `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/utils/wiseadmit.png`;

  return {
    title: title,
    icons: {
      icon: `${applicationConfig.frontendUrlConfig}/favicon.ico`,
    },
    description: description,
    keywords: keywords,
    metadataBase: new URL(applicationConfig.frontendUrlConfig),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: "WiseAdmit",
      images: [
        {
          url: pageImage,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [pageImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// You can remove the HeadComponent entirely as it's no longer needed

// use this instead
// export const metadata: Metadata = generateMetadata({
//   title: "",
//   description: "",
//   endPoint: "",
// });
// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
// };
