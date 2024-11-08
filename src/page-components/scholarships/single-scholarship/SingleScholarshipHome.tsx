import { IScholarshipResponse } from "@/types/utils";
import React from "react";
import SingleScholarshipHero from "./SingleScholarshipHero";
import SingleScholarshipQualification from "./SingleScholarshipQualification";
import SingleScholarshipBody from "./SingleScholarshipBody";
import SinglePopularScholarship from "./SinglePopularScholarship";
import { Box } from "@mui/material";

type Props = {
  scholarship: IScholarshipResponse;
  popularScholarships: any;
};

const SingleScholarshipHome = ({ scholarship, popularScholarships }: Props) => {
  return (
    <Box bgcolor="#F9F9F9">
      <SingleScholarshipHero scholarship={scholarship} />
      <SingleScholarshipQualification scholarship={scholarship} />
      <SingleScholarshipBody scholarship={scholarship} />
      <SinglePopularScholarship poplarScholarships={popularScholarships} />
    </Box>
  );
};

export default SingleScholarshipHome;
