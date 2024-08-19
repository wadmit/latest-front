import NuaaFooter from "@/components/common/navbar/NuaaFooter";
import NuaaNavbar from "@/components/common/navbar/NuaaNavbar";
import {
  IUniversityTemplateConfig,
  IUniversityTemplateImages,
} from "@/types/utils";
import React from "react";

const layout = ({
  children,
  config,
  images,
}: {
  children: React.ReactNode;
  config: IUniversityTemplateConfig;
  images: IUniversityTemplateImages[];
}) => {
  return (
    <>
      <NuaaNavbar config={config} />
      {children}
      <NuaaFooter config={config} />
    </>
  );
};

export default layout;
