"use client";

import { Navbar } from "@/components/common";
import CategoryButton from "@/components/common/buttons/CategoryButton";
import { Footer } from "@/components/common/footer/Footer";
import FooterContact from "@/page-components/contactus/components/FooterContact";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const renderFooter = () => {
    switch (pathname) {
      case "/contactus":
        return <FooterContact />;
      case "/applynow":
        return null;
      default:
        return <Footer />;
    }
  };

  return (
    <>
      {pathname !== "/applynow" && <Navbar />}
      <CategoryButton />
      {children}
      {renderFooter()}
    </>
  );
}
