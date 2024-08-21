import { Box } from "@mui/material";
import React from "react";
import { config } from "./utils/provider";
import {
  NuaaSectionOne,
  NuaaSectionTwo,
} from "@/page-components/nuaa/components";


const NuaaScoreHome = () => {
  return (
    // <Layout config={config} images={images}>
    <Box position="relative">
      <NuaaSectionOne />
      <NuaaSectionTwo title={config.title} scorePageUrl={config.scorePageUrl} />
    </Box>
    // </Layout>
  );
};

export default NuaaScoreHome;
