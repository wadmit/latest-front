import React from "react";
import { NuaaResult } from "@/page-components/nuaa/components";
import { config } from "./utils/provider";
import Layout from "@/app/(nuaa)/nuaa/layout";

type Props = {};

const NuaaResultHome = (props: Props) => {
  return (
    // <Layout config={config} images={images}>
    <NuaaResult
      resultImage={config.resultImage!}
      title={config.title}
      url={config.originalSiteUrl}
    />
    // </Layout>
  );
};

export default NuaaResultHome;
