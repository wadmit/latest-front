import { convertToSearchParams } from "@/api/web/program.action";
import { getInitialUniversitiesForUniversityPage } from "@/api/web/university.action.";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import UniversityHome from "@/page-components/universities";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = generateMetadata({
  title: "Universities | WiseAdmit",
  description:
    "Find the Top Universities and Programs in the China. Get the latest information about the Universities and Programs in the China.",
  endPoint: "/universities",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const UniversityPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const query = convertToSearchParams(searchParams);

  const universitiesData = await getInitialUniversitiesForUniversityPage(query);

  return (
    <>
      <UniversityHome
        universities={universitiesData.data}
        paginate={universitiesData.paginate}
      />
    </>
  );
};

export default UniversityPage;
