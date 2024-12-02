"use client";
import { RootContainer } from "@/components/common";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import SchImg from "public/images/scholarships/popularsch.png";
import Image from "next/image";
import {
  PersonRequest,
  ScholarshipHat,
  ScholarshipCurrency,
} from "../utils/svg";
import { getScholarshipTypeStyle } from "@/page-components/scholarships/utils/provider";
import Link from "next/link";
import applicationConfig from "@/config";
import useCostConverterMain from "@/hooks/costConverterMain";
import { IScholarships } from "@/types/scholarship";
import { ITag } from "@/types/tag";

type Props = {
  poplarScholarships: IScholarships[];
};

const ScholarshipCard = ({ scholarship }: { scholarship: IScholarships }) => {
  const getConvertedCosts = useCostConverterMain();

  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Box
        display="flex"
        gap={{ lg: "17px", md: "17px", sm: "5px", xs: "20px" }}
        flexDirection={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        boxShadow="0px 8px 20px 0px #0000000F"
        p={2}
        mb={2}
        borderRadius="12px"
        bgcolor="#FFFFFF"
      >
        <Box
          height="194px"
          width={{ lg: "205px", md: "353px", sm: "100%", xs: "100%" }}
          borderRadius="8px"
          overflow="hidden"
          flex="0 0 auto"
        >
          <Image
            layout="responsive"
            alt="Scholarship"
            width={100}
            height={1}
            src={
              scholarship.coverImage
                ? `${applicationConfig.distributionKey}/${scholarship.coverImage}`
                : SchImg
            }
          />
        </Box>

        <Box display="flex" flexDirection="column" gap="20px" flex="1 1 auto">
          <Box display="flex" gap="8px">
            {scholarship?.tags &&
              scholarship?.tags.length > 0 &&
              scholarship?.tags.map((tag: ITag, idx: number) => {
                const style = getScholarshipTypeStyle(tag);
                return (
                  <Box key={idx} bgcolor={style.bgColor} padding="4px">
                    <Typography
                      fontWeight={600}
                      fontFamily="HankenGroteskSemiBold"
                      fontSize={{
                        lg: "10px",
                        md: "10px",
                        sm: "10px",
                        xs: "10px",
                      }}
                      lineHeight="12px"
                      color={style.textColor}
                    >
                      {tag && tag.name.toUpperCase()}
                    </Typography>
                  </Box>
                );
              })}
          </Box>

          <Typography
            fontWeight={800}
            fontFamily="HankenGroteskExtraBold"
            fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
            lineHeight={{
              lg: "26px",
              md: "26px",
              sm: "23.4px",
              xs: "23.4px",
            }}
            letterSpacing="-2%"
            color="#201C1A"
          >
            <Link href={`/scholarships/${scholarship.slug}`}>
              {scholarship?.name}
            </Link>
          </Typography>
          <Divider />

          <Box display="flex" flexDirection="column" gap="12px">
            {/* <Box display="flex" alignItems="center" gap="4px">
              <PersonRequest />
              <Typography
                fontWeight={400}
                fontFamily="HankenGroteskRegular"
                fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
                lineHeight={{
                  lg: "19.6px",
                  md: "19.6px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 0.55)"
              >
                Scholarships:
              </Typography>
              <Typography
                fontWeight={400}
                fontFamily="HankenGroteskRegular"
                fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
                lineHeight={{
                  lg: "19.6px",
                  md: "19.6px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 1)"
              >
                {scholarship?.scholarship?.totalScholarshipRecipients
                  ? scholarship?.scholarship?.totalScholarshipRecipients
                  : 0}
              </Typography>
            </Box> */}

            <Box display="flex" alignItems="center" gap="4px">
              <ScholarshipHat />
              <Typography
                fontWeight={400}
                fontFamily="HankenGroteskRegular"
                fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
                lineHeight={{
                  lg: "19.6px",
                  md: "19.6px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 0.55)"
              >
                Education level:
              </Typography>
              <Typography
                fontWeight={400}
                fontFamily="HankenGroteskRegular"
                fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
                lineHeight={{
                  lg: "19.6px",
                  md: "19.6px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 1)"
              >
                {"Bachelor's/ Master's"}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap="4px">
              <ScholarshipCurrency />
              <Typography
                fontWeight={400}
                fontFamily="HankenGroteskRegular"
                fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
                lineHeight={{
                  lg: "19.6px",
                  md: "19.6px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 0.55)"
              >
                Value:
              </Typography>
              <Typography
                fontWeight={400}
                fontFamily="HankenGroteskRegular"
                fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
                lineHeight={{
                  lg: "19.6px",
                  md: "19.6px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 1)"
              >
                {
                  getConvertedCosts(
                    scholarship?.amount ?? 0,
                    scholarship?.currency
                  ).formattedValue
                }
                {/* {scholarship?.scholarship?.scholarshipAmount ?? 0}{" "}
              {scholarship?.scholarship?.scholarshipAmountCurrency ?? "CNY"} */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

const SinglePopularScholarship = ({ poplarScholarships }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const displayedScholarships = showAll
    ? poplarScholarships
    : poplarScholarships.slice(0, 4);
  return (
    <RootContainer
      sx={{
        mt: { lg: "95px", md: "65px", sm: "45px", xs: "45px" },
        mb: "20px",
      }}
    >
      <Box mb={4}>
        <Typography
          fontWeight={800}
          fontFamily="HankenGroteskExtraBold"
          fontSize={{ lg: "28px", md: "28px", sm: "20px", xs: "20px" }}
          lineHeight={{ lg: "36.4px", md: "36.4px", sm: "26px", xs: "26px" }}
          letterSpacing="-2%"
          color="#201C1A"
        >
          Popular scholarships
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {displayedScholarships.map((scholarship, index) => (
          <ScholarshipCard
            key={scholarship.id || index}
            scholarship={scholarship}
          />
        ))}
      </Grid>
      {poplarScholarships.length > 4 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button
            sx={{
              border: "1px solid var(--icon-disable, #A3A3A9)",
              borderRadius: "8px",
              background: "transparent",
              padding: "22px",
            }}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "View Less" : "View More"}
          </Button>
        </Box>
      )}
    </RootContainer>
  );
};

export default SinglePopularScholarship;
