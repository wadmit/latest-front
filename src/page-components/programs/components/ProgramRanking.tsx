import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import Image from "next/image";
import ProgramsDetailContext from "@/context/program-detail-context";
import { EProgramRanking } from "@/types/program";

function ProgramRanking() {
  const program = useContext(ProgramsDetailContext);
  const [rankings, setRankings] = useState<Record<
    EProgramRanking,
    number
  > | null>(null);

  useEffect(() => {
    const tempRankings = program?.detail?.program_rankings as any;

    if (!tempRankings) {
      return;
    }

    const extractedRanking = tempRankings.reduce(
      (acc: any, rank: any) => ({ ...acc, ...rank }),
      {} as Record<EProgramRanking, number>
    );

    setRankings(extractedRanking);
  }, [program?.detail?.program_rankings]);

  return (
    <Box
      borderRadius="12px"
      padding="35px 32px"
      border="1px solid #E9E9E9"
      bgcolor="white"
    >
      <Typography fontSize="24px" fontFamily="HankenGroteskExtraBold">
        Ranking
      </Typography>
      <Grid mt="35px" container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Box gap="19px" display="flex" alignItems="center">
            <Image
              style={{
                borderRadius: "50%",
              }}
              src="/images/programs/us-ranking.webp"
              width="64"
              height="64"
              quality={100}
              alt="us ranking"
            />
            <Box display="flex" flexDirection="column">
              <Typography fontSize="24px" fontFamily="HankenGroteskExtraBold">
                #{(rankings && rankings[EProgramRanking.USRANKING]) ?? "NA"}
              </Typography>
              <Typography
                color="rgba(32, 28, 26, 0.55)"
                fontSize="18px"
                fontFamily="HankenGroteskSemiBold"
              >
                US NEWS Rankings
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          mt={{ sm: "20px", xs: "20px", lg: 0, md: 0 }}
          lg={6}
          md={6}
          sm={12}
          xs={12}
        >
          <Box gap="19px" display="flex" alignItems="center">
            <Image
              src="/images/programs/shanghai-ranking.webp"
              width="64"
              height="64"
              style={{
                borderRadius: "50%",
              }}
              quality={100}
              alt="Shanghai ranking"
            />
            <Box display="flex" flexDirection="column">
              <Typography fontSize="24px" fontFamily="HankenGroteskExtraBold">
                #
                {(rankings && rankings[EProgramRanking.SANGHAIRANKING]) ?? "NA"}
              </Typography>
              <Typography
                color="rgba(32, 28, 26, 0.55)"
                fontSize="18px"
                fontFamily="HankenGroteskSemiBold"
              >
                Shanghai Rankings
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProgramRanking;
