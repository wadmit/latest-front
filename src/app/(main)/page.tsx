import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import HomePage from "@/page-components/home";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "WiseAdmit | Apply To Universities Worldwide",
  description:
    "WiseAdmit is an all-in-one platform for international students to instantly find scholarships, best-fit programs, and universities worldwide.",
  endPoint: "/",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function Home() {
  return <HomePage />;
}
