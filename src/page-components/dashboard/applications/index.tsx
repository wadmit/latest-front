import Loader from "@/components/common/circular-loader/Loader";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const ApplicationPageComponent = dynamic<any>(
  () =>
    import(
      "@/page-components/dashboard/applications/components/ApplicationPageComponent"
    ),
  {
    ssr: true,
    suspense: true,
  }
);

const ApplicationHome = () => {
  return (
    <Suspense fallback={<Loader center />}>
      <ApplicationPageComponent />
    </Suspense>
  );
};

export default ApplicationHome;
