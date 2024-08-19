import Loader from "@/components/common/circular-loader/Loader";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const DocumentPageComponent = dynamic<any>(
  () =>
    import(
      "@/page-components/dashboard/documents/components/DocumentPageComponent"
    ),
  {
    ssr: true,
    suspense: true,
  }
);

const DocumentsHome = () => {
  return (
    <Suspense fallback={<Loader center />}>
      <DocumentPageComponent />
    </Suspense>
  );
};

export default DocumentsHome;
