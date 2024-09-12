"use client";
import { RootContainer } from "@/components/common";
import { Box, Typography } from "@mui/material";

function ReachTarget() {
  return (
    <Box bgcolor="rgba(249, 249, 252, 1)" mt="50px">
      <RootContainer>
        <Box
          display="flex"
          flexDirection={{
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          }}
          padding="64px 0px 64px"
          gap={{ lg: "133px", md: "41px", sm: "41px", xs: "41px" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            width={{ lg: "283px", md: "100%", sm: "100%", xs: "100%" }}
          >
            <Typography
              fontWeight={800}
              color="rgba(32, 28, 26, 1)"
              fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "24px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "41.6px",
                md: "41.6px",
                sm: "31.2px",
                xs: "31.2px",
              }}
              letterSpacing="-2%"
            >
              Reach your target
            </Typography>
            <Typography
              fontWeight={400}
              mt="10px"
              fontSize={{ lg: "16px", md: "16px", sm: "16px", xs: "16px" }}
              fontFamily="HankenGroteskRegular"
              lineHeight={{
                lg: "22.4px",
                md: "22.4px",
                sm: "19.6px",
                xs: "19.6px",
              }}
              color="rgba(32, 28, 26, 0.9)"
            >
              We help your attract quality students from all around the world
            </Typography>
          </Box>

          <Box
            display={{ lg: "flex", md: "none", sm: "none", xs: "none" }}
            flexDirection={{
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            }}
            gap={{ lg: "24px", md: "24px", sm: "32px", xs: "32px" }}
          >
            <Box
              gap="26px"
              display="flex"
              flexDirection="column"
              bgcolor="rgba(255, 255, 255, 1)"
              padding="25px 24px 41px"
              width={{ lg: "245px", md: "245px", sm: "100%", xs: "100%" }}
              boxShadow=" 0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
              borderRadius="12px"
            >
              <Box
                display="flex"
                alignItems="flex-start"
                borderBottom="2px solid rgba(170, 68, 1, 1)"
                width="60px"
                pb="5px"
              >
                <img
                  width="32px"
                  height="32px"
                  src="/images/institution/bankoutline.svg"
                  alt="University"
                />
              </Box>

              <Typography
                component={"h3"}
                fontWeight={800}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
                letterSpacing="-2%"
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
                Promote your university via WiseAdmit and reach your <br />{" "}
                target audience from all <br /> around the world
              </Typography>
            </Box>

            <Box
              gap="26px"
              display="flex"
              flexDirection="column"
              bgcolor="rgba(255, 255, 255, 1)"
              padding="25px 24px 41px"
              width={{ lg: "245px", md: "245px", sm: "100%", xs: "100%" }}
              boxShadow=" 0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
              borderRadius="12px"
            >
              <Box
                display="flex"
                alignItems="flex-start"
                borderBottom="2px solid rgba(170, 68, 1, 1)"
                width="60px"
                pb="5px"
              >
                <img
                  width="32px"
                  height="32px"
                  src="/images/institution/search-favorite.svg"
                  alt="Search favourite"
                  // style={{
                  //   borderBottom: "2px solid rgba(170, 68, 1, 1)",
                  //   paddingBottom: "5px",
                  // }}
                />
              </Box>
              <Typography
                component={"h3"}
                fontWeight={800}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
                letterSpacing="-2%"
              >
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
                Enhance your recruitment <br /> process by reaching the <br />{" "}
                right audience segment
              </Typography>
            </Box>

            <Box
              gap="26px"
              display="flex"
              flexDirection="column"
              bgcolor="rgba(255, 255, 255, 1)"
              padding="25px 24px 41px"
              width={{ lg: "245px", md: "245px", sm: "100%", xs: "100%" }}
              boxShadow=" 0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
              borderRadius="12px"
            >
              <Box
                display="flex"
                alignItems="flex-start"
                borderBottom="2px solid rgba(170, 68, 1, 1)"
                width="60px"
                pb="5px"
              >
                <img
                  width="32px"
                  height="32px"
                  src="/images/institution/user-tick.svg"
                  alt="user tick"
                  // style={{
                  //   borderBottom: "2px solid rgba(170, 68, 1, 1)",
                  //   paddingBottom: "5px",
                  // }}
                />
              </Box>
              <Typography
                component={"h3"}
                fontWeight={800}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
                letterSpacing="-2%"
              >
                Connect with students
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
                Connect with your target <br /> students via WiseAdmit
              </Typography>
            </Box>
          </Box>

          {/* For mobile view */}
          <Box
            display={{ lg: "none", md: "flex", sm: "flex", xs: "flex" }}
            flexDirection={{
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            }}
            gap={{ lg: "24px", md: "24px", sm: "32px", xs: "32px" }}
          >
            <Box
              gap="26px"
              display="flex"
              flexDirection="column"
              bgcolor="rgba(255, 255, 255, 1)"
              padding="25px 24px 41px"
              width={{ lg: "245px", md: "100%", sm: "100%", xs: "100%" }}
              boxShadow=" 0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
              borderRadius="12px"
            >
              <Box
                display="flex"
                alignItems="flex-start"
                borderBottom="2px solid rgba(170, 68, 1, 1)"
                width="60px"
                pb="5px"
              >
                <img
                  width="32px"
                  height="32px"
                  src="/images/institution/bankoutline.svg"
                  alt="University"
                />
              </Box>
              <Typography
                component={"h3"}
                fontWeight={800}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
                letterSpacing="-2%"
              >
                {" "}
                Promote your university
              </Typography>
              <Typography
                mt="-6px"
                fontWeight={400}
                fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "16px" }}
                fontFamily="HankenGroteskRegular"
                lineHeight={{
                  lg: "20.8px",
                  md: "20.8px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 0.9)"
              >
                Promote your university via WiseAdmit and reach your target
                audience from all around the world
              </Typography>
            </Box>

            <Box
              gap="26px"
              display="flex"
              flexDirection="column"
              bgcolor="rgba(255, 255, 255, 1)"
              padding="25px 24px 41px"
              width={{ lg: "245px", md: "100%", sm: "100%", xs: "100%" }}
              boxShadow=" 0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
              borderRadius="12px"
            >
              <Box
                display="flex"
                alignItems="flex-start"
                borderBottom="2px solid rgba(170, 68, 1, 1)"
                width="60px"
                pb="5px"
              >
                <img
                  width="32px"
                  height="32px"
                  src="/images/institution/search-favorite.svg"
                  alt="Search favourite"
                />
              </Box>
              <Typography
                component={"h3"}
                fontWeight={800}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
                letterSpacing="-2%"
              >
                Enhance your recruitment
              </Typography>
              <Typography
                mt="-6px"
                fontWeight={400}
                fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "16px" }}
                fontFamily="HankenGroteskRegular"
                lineHeight={{
                  lg: "20.8px",
                  md: "20.8px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 0.9)"
              >
                Enhance your recruitment process by reaching the right audience
                segment
              </Typography>
            </Box>

            <Box
              gap="26px"
              display="flex"
              flexDirection="column"
              bgcolor="rgba(255, 255, 255, 1)"
              padding="25px 24px 41px"
              width={{ lg: "245px", md: "100%", sm: "100%", xs: "100%" }}
              boxShadow=" 0px 2px 4px 0px rgba(0, 0, 0, 0.16)"
              borderRadius="12px"
            >
              <Box
                display="flex"
                alignItems="flex-start"
                borderBottom="2px solid rgba(170, 68, 1, 1)"
                width="60px"
                pb="5px"
              >
                <img
                  width="32px"
                  height="32px"
                  src="/images/institution/user-tick.svg"
                  alt="User Tick"
                />
              </Box>
              <Typography
                component={"h3"}
                fontWeight={800}
                color="rgba(32, 28, 26, 1)"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="26px"
                fontSize="20px !important"
                letterSpacing="-2%"
              >
                Connect with students
              </Typography>
              <Typography
                mt="-6px"
                fontWeight={400}
                fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "16px" }}
                fontFamily="HankenGroteskRegular"
                lineHeight={{
                  lg: "20.8px",
                  md: "20.8px",
                  sm: "19.6px",
                  xs: "19.6px",
                }}
                color="rgba(32, 28, 26, 0.9)"
              >
                Connect with your target students via WiseAdmit
              </Typography>
            </Box>
          </Box>
        </Box>
      </RootContainer>
    </Box>
  );
}

export default ReachTarget;
