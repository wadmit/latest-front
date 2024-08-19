import { RootContainer } from "@/components/common";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import UniversityDetailContext from "@/context/university-detail-context";
import {
  UniversityBody,
  UniversityHeader,
} from "@/page-components/universities/components";

function UniversityDetails() {
  const university = useContext(UniversityDetailContext);

  return (
    <RootContainer>
      <Grid bgcolor="transparent" pt="32px" mb="24px">
        <Typography
          fontSize="14px"
          fontFamily="HankenGroteskRegular"
          color="rgba(32, 28, 26, 0.55)"
        >
          Home / <Link href="/universities"> Universities </Link>/{" "}
          <Link href={`/universities/${university?.slug}`}>
            <Typography color="#000">{university?.name}</Typography>
          </Link>
        </Typography>
      </Grid>
      <UniversityHeader />
      <UniversityBody />
    </RootContainer>
  );
}

export default UniversityDetails;
