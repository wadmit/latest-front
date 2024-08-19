import {
  convertToSearchParams,
  getInitialProgramsForProgramPage,
} from "@/api/web/program.action";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ProgramHome from "@/page-components/programs";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = generateMetadata({
  title: "Programs | WiseAdmit",
  description:
    "Find the Top Universities and Programs in the China. Get the latest information about the Universities and Programs in the China.",
  endPoint: "/programs",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const ProgramPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const query = convertToSearchParams(searchParams);

  const programsData = await getInitialProgramsForProgramPage(query);

  return (
    <>
      <ProgramHome
        programs={programsData.data}
        paginate={programsData.paginate}
      />
    </>
  );
};

export default ProgramPage;
