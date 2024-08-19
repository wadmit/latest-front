"use client";
import { RootContainer } from "@/components/common";
import { Box, Typography } from "@mui/material";

function ReachTarget() {
  return (
    <Box bgcolor="rgba(252, 250, 248, 1)">
      <RootContainer>
        <Box
          display="flex"
          flexDirection="column"
          mt={{ lg: "102px", md: "102px", sm: "80px", xs: "80px" }}
          padding={{
            lg: "51px 0px",
            md: "51px 0px",
            sm: "34px 0px",
            xs: "34px 0px",
          }}
        >
          <Typography
            component="h2"
            color="rgba(32, 28, 26, 1)"
            fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "24px" }}
            fontFamily="HankenGroteskExtraBold"
            lineHeight="41.6px"
          >
            Reach your target
          </Typography>
          <Typography
            component="p"
            mt="10px"
            fontSize="16px"
            fontFamily="HankenGroteskRegular"
            lineHeight="20.8px"
          >
            We help your attract quality students from all around the world
          </Typography>

          <Box
            flexDirection={{
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            }}
            justifyContent="space-between"
            display="flex"
            mt="54px"
            gap="24px"
          >
            <Box gap="26px" display="flex" flexDirection="column">
              <img
                width="32px"
                height="32px"
                src="/images/institution/bank.svg"
                alt="University"
              />
              <Typography
                component={"h3"}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
              >
                {" "}
                Promote your university
              </Typography>
              <Typography
                component={"p"}
                mt="-6px"
                width="264px"
                fontSize="16px"
                fontFamily="HankenGroteskRegular"
                lineHeight="20.8px"
                color="rgba(32, 28, 26, 0.9)"
              >
                Promote your university via WiseAdmit and reach your target
                audience from all around the world
              </Typography>
            </Box>
            <Box
              width={{
                lg: "1px",
                md: "1px",
                sm: "100%",
                xs: "100%",
              }}
              height={{
                lg: "180px",
                md: "180px",
                sm: "1px",
                xs: "1px",
              }}
              bgcolor="rgba(187, 187, 187, 1)"
            />
            <Box gap="26px" display="flex" flexDirection="column">
              <img
                width="32px"
                height="32px"
                src="/images/institution/user-tick.svg"
                alt="University"
              />
              <Typography
                component={"h3"}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
              >
                {" "}
                Connect with students{" "}
              </Typography>
              <Typography
                mt="-6px"
                width="264px"
                component={"p"}
                fontSize="16px"
                fontFamily="HankenGroteskRegular"
                lineHeight="20.8px"
                color="rgba(32, 28, 26, 0.9)"
              >
                Connect with your target students via WiseAdmit
              </Typography>
            </Box>
            <Box
              width={{
                lg: "1px",
                md: "1px",
                sm: "100%",
                xs: "100%",
              }}
              height={{
                lg: "180px",
                md: "180px",
                sm: "1px",
                xs: "1px",
              }}
              bgcolor="rgba(187, 187, 187, 1)"
            />
            <Box gap="26px" display="flex" flexDirection="column">
              <img
                width="32px"
                height="32px"
                src="/images/institution/search-favorite.svg"
                alt="University"
              />
              <Typography
                component={"h3"}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
              >
                {" "}
                Enhance your recruitment
              </Typography>
              <Typography
                component={"p"}
                mt="-6px"
                width="264px"
                fontSize="16px"
                fontFamily="HankenGroteskRegular"
                lineHeight="20.8px"
                color="rgba(32, 28, 26, 0.9)"
              >
                Enhance your recruitment process by reaching the right audience
                segment
              </Typography>
            </Box>
          </Box>
        </Box>
      </RootContainer>
    </Box>
  );
}

export default ReachTarget;
