import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import JoinUsHome from "@/page-components/joinus";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Join Us | WiseAdmit",
  description:
    "Become a partner with the WiseAdmit. Join us to recruit the best students from around the world.",
  endPoint: "/joinus",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <JoinUsHome />;
};

export default page;
