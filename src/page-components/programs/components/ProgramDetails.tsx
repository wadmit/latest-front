import { RootContainer } from "@/components/common";
import ProgramsDetailContext from "@/context/program-detail-context";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import {
  ProgramBody,
  ProgramHeader,
} from "@/page-components/programs/components";

function ProgramDetails() {
  const program = useContext(ProgramsDetailContext);

  return (
    <RootContainer>
      <Grid bgcolor="transparent" pt="32px" mb="24px">
        <Typography
          fontSize="14px"
          fontFamily="HankenGroteskRegular"
          color="rgba(32, 28, 26, 0.55)"
        >
          Home / <Link href="/programs"> Programs </Link>/{" "}
          <Link href={`/programs/${program?.slug}`}>
            <Typography color="#000">{program?.name}</Typography>
          </Link>
        </Typography>
      </Grid>
      <ProgramHeader />
      <ProgramBody />
    </RootContainer>
  );
}

export default ProgramDetails;
