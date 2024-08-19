import { Box } from "@mui/material";
import React from "react";
import { config, images } from "./utils/provider";
import {
  NuaaSectionOne,
  NuaaSectionTwo,
} from "@/page-components/nuaa/components";
import Layout from "@/app/(nuaa)/nuaa/layout";

type Props = {};

const NuaaScoreHome = (props: Props) => {
  return (
    // <Layout config={config} images={images}>
    <Box position="relative">
      <NuaaSectionOne images={images} />
      <NuaaSectionTwo title={config.title} scorePageUrl={config.scorePageUrl} />
    </Box>
    // </Layout>
  );
};

export default NuaaScoreHome;
