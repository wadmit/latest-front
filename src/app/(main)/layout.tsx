"use client";
import { Navbar } from "@/components/common";
import CategoryButton from "@/components/common/buttons/CategoryButton";
import { Footer } from "@/components/common/footer/Footer";
import FooterContact from "@/page-components/contactus/components/FooterContact";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isContactUsPage = pathname === "/contactus";
  return (
    <>
      <Navbar />
      <CategoryButton />
      {children}
      {isContactUsPage ? <FooterContact /> : <Footer />}
    </>
  );
}
