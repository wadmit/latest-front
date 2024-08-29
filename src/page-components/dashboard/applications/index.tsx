"use client"
import Loader from "@/components/common/circular-loader/Loader";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ApplicationPageComponent } from "./components";

// const ApplicationPageComponent = dynamic<any>(
//   () =>
//     import(
//       "@/page-components/dashboard/applications/components/ApplicationPageComponent"
//     ),
//   {
//     ssr: false,
//     suspense: true,
//   }
// );

const ApplicationHome = () => {
  return (
    <>
      <ApplicationPageComponent
       />
    </>
  );
};

export default ApplicationHome;
