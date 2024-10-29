"use client";
import { useState } from "react";
import {
  Box,
  Divider,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import { RootContainer } from "../wrapper/RootContainer";
import { WiseAdmitFooterSvg, WiseAdmitMobileFooterSvg } from "public/svg";
import { IFooterDataProps } from "@/components/common/footer/utils/types";

function SmallDot() {
  return (
    <svg
      width="3"
      height="3"
      viewBox="0 0 3 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="#D9D9D9" />
    </svg>
  );
}

const studyInChina: IFooterDataProps[] = [
  { title: "Eligibility", link: "/wisescore" },
  { title: "Institutions", link: "/institution" },
  { title: "Courses", link: "/programs" },
  { title: "Scholarships", link: "/" },
];

const ourServices: IFooterDataProps[] = [
  { title: "Students", link: "/students" },
  { title: "Institutions", link: "/institution" },
  { title: "Recruiting partners", link: "/recruiting-partners" },
];
const message: IFooterDataProps[] = [
  { title: "Message from CEO", link: "/" },
  { title: "Open positions", link: "/" },
];
const aboutAndContact: IFooterDataProps[] = [
  { title: "Our story", link: "/aboutus" },
  { title: "Blog", link: "/blogs" },
  { title: "News", link: "/news" },
  { title: "Contact us", link: "/contactus" },
];

const branchData = [
  {
    branch: "China",
    street: "29 Jiangjun Avenue",
    location: "Nanjing, Jiangsu",
    phone: "+86-185-5169-1860",
  },
  {
    branch: "Nepal",
    street: "Bakhundol, Lalitpur",
    location: "",
    phone: "+977-9802356756",
  },
  {
    branch: "Canada",
    street: "5723 Balsam St.",
    location: "Vancouver, British Columbia",
    phone: "+1-604-767-4559",
  },
];

function BranchComponent({
  branch,
  street,
  location,
  phone,
}: {
  branch: string;
  street: string;
  location: string;
  phone: string;
}) {
  return (
    <Box mt="12px">
      <Stack rowGap="0rem" color="grey.100">
        <Typography
          fontFamily="HankenGroteskSemiBold"
          fontWeight={600}
          fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
          lineHeight={{
            lg: "22.4px",
            md: "22.4px",
            sm: "19.6px",
            xs: "19.6px",
          }}
          color="rgba(255, 255, 255, 1)"
          mb="7px"
          letterSpacing="1%"
        >
          {branch}
        </Typography>
        <Typography
          fontFamily="HankenGroteskRegular"
          fontWeight={400}
          fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
          lineHeight={{
            lg: "22.4px",
            md: "22.4px",
            sm: "19.6px",
            xs: "19.6px",
          }}
          color="rgba(214, 214, 214, 0.8)"
          letterSpacing="1%"
        >
          {street}
        </Typography>
        <Typography
          fontFamily="HankenGroteskRegular"
          fontWeight={400}
          fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
          lineHeight={{
            lg: "22.4px",
            md: "22.4px",
            sm: "19.6px",
            xs: "19.6px",
          }}
          color="rgba(214, 214, 214, 0.8)"
          letterSpacing="1%"
        >
          {location}
        </Typography>
        <a href={`tel:${phone}`}>
          <Typography
            fontFamily="HankenGroteskRegular"
            fontWeight={400}
            fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
            lineHeight={{
              lg: "22.4px",
              md: "22.4px",
              sm: "19.6px",
              xs: "19.6px",
            }}
            color="rgba(214, 214, 214, 0.8)"
            letterSpacing="1%"
          >
            {phone}
          </Typography>
        </a>
      </Stack>
    </Box>
  );
}
function LinkComponent({
  linkArray,
  title,
}: {
  linkArray: IFooterDataProps[];
  title: string;
}) {
  return (
    <Box>
      <Box mb=".625rem">
        <Typography
          fontFamily="HankenGroteskExtraBold"
          fontWeight={800}
          fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
          lineHeight={{ lg: "26px", md: "26px", sm: "23.4px", xs: "23.4px" }}
          letterSpacing="-2%"
          color="rgba(255, 255, 255, 1)"
        >
          {title}
        </Typography>
      </Box>
      <Stack rowGap="11px" color="grey.100">
        {linkArray.map((item, index) => (
          <MuiLink
            color="common.white"
            underline="hover"
            sx={{ cursor: "pointer" }}
            href={item.link}
            key={item.title}
            target="_blank"
            rel="noreferrer"
          >
            <Typography
              fontFamily="HankenGroteskRegular"
              fontWeight={400}
              fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
              lineHeight={{
                lg: "22.4px",
                md: "22.4px",
                sm: "19.6px",
                xs: "19.6px",
              }}
              color="rgba(214, 214, 214, 0.8)"
            >
              {item.title}
            </Typography>
          </MuiLink>
        ))}
      </Stack>
    </Box>
  );
}

export function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [hoveredIcon, setHoveredIcon] = useState("");

  const handleMouseEnter = (iconName: any) => {
    setHoveredIcon(iconName);
  };

  const handleMouseLeave = () => {
    setHoveredIcon("");
  };
  return (
    <RootContainer
      bgcolor="rgba(33, 21, 12, 1)"
      component="footer"
      py={{ lg: "84px", md: "84px", sm: "48px", xs: "48px" }}
      color="common.white"
    >
      <Grid
        container
        spacing={{ lg: "134px", md: "134px", sm: "60px", xs: "48px" }}
      >
        {/* First Column */}
        <Grid item xs={12} lg={4} md={5} sm={6}>
          <Box display="flex" flexDirection="column" gap="20px">
            {isMobile ? <WiseAdmitMobileFooterSvg /> : <WiseAdmitFooterSvg />}
            <Box display="flex" flexDirection="column" gap="12px">
              <Typography
                fontFamily="HankenGroteskExtraBold"
                fontWeight={800}
                fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
                lineHeight={{
                  lg: "26px",
                  md: "26px",
                  sm: "23.4px",
                  xs: "23.4px",
                }}
                letterSpacing="-2%"
                color="rgba(255, 255, 255, 1)"
              >
                WISEADMIT TECHNOLOGY INC.
              </Typography>
              <Typography
                fontFamily="HankenGroteskRegular"
                fontWeight={400}
                fontSize="14px"
                lineHeight="19.6px"
                letterSpacing="1%"
                color="rgba(214, 214, 214, 0.8)"
                maxWidth="31.8125rem"
                textAlign="left"
              >
                WiseAdmit is a game-changing platform that helps students apply
                to the most suitable programs and world-class universities in
                under three minutes.
              </Typography>
            </Box>
            <Box display="flex" gap="18px">
              <Link
                href="https://www.facebook.com/wiseadmitedu"
                passHref
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={
                    hoveredIcon === "fb"
                      ? "/images/footer/hoverfb.svg"
                      : "/images/footer/fb.svg"
                  }
                  height={34}
                  width={34}
                  // height={isMobile ? '32px' : '34px'}
                  // width={isMobile ? '32px' : '34px'}
                  alt="Fb"
                  onMouseEnter={() => handleMouseEnter("fb")}
                  onMouseLeave={handleMouseLeave}
                />
                {/* </a> */}
              </Link>
              <Link
                href="https://www.instagram.com/wiseadmitedu/"
                passHref
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={
                    hoveredIcon === "insta"
                      ? "/images/footer/hoverinsta.svg"
                      : "/images/footer/insta.svg"
                  }
                  height={34}
                  width={34}
                  // height={isMobile ? '32px' : '34px'}
                  // width={isMobile ? '32px' : '34px'}
                  alt="insta"
                  onMouseEnter={() => handleMouseEnter("insta")}
                  onMouseLeave={handleMouseLeave}
                />
                {/* </a> */}
              </Link>
              <Link
                href="https://www.linkedin.com/company/wise-admit/mycompany/"
                passHref
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={
                    hoveredIcon === "linkedin"
                      ? "/images/footer/hoverlinkedin.svg"
                      : "/images/footer/linkedin.svg"
                  }
                  height={34}
                  width={34}
                  // height={isMobile ? '32px' : '34px'}
                  // width={isMobile ? '32px' : '34px'}
                  alt="linkedin"
                  onMouseEnter={() => handleMouseEnter("linkedin")}
                  onMouseLeave={handleMouseLeave}
                />
                {/* </a> */}
              </Link>
              <Link
                href="https://www.tiktok.com/@wiseadmit?_t=8lGQuUiZQW0&_r=1"
                passHref
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={
                    hoveredIcon === "tiktok"
                      ? "/images/footer/hovertiktok.svg"
                      : "/images/footer/tiktok.svg"
                  }
                  // height={isMobile ? '32px' : '34px'}
                  // width={isMobile ? '32px' : '34px'}
                  height={34}
                  width={34}
                  alt="tiktok"
                  onMouseEnter={() => handleMouseEnter("tiktok")}
                  onMouseLeave={handleMouseLeave}
                />
                {/* </a> */}
              </Link>
              <Link
                href="https://www.youtube.com/@wiseadmit_"
                passHref
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={
                    hoveredIcon === "yt"
                      ? "/images/footer/ythover.svg"
                      : "/images/footer/yt.svg"
                  }
                  height={34}
                  width={34}
                  // height={isMobile ? '32px' : '34px'}
                  // width={isMobile ? '32px' : '34px'}
                  alt="yt"
                  onMouseEnter={() => handleMouseEnter("yt")}
                  onMouseLeave={handleMouseLeave}
                />
                {/* </a> */}
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} lg={8} md={7} sm={6} container>
          {/* 2nd Column First Sub-Column */}
          <Grid item xs={6} lg={4} md={6} sm={6}>
            <LinkComponent linkArray={ourServices} title="Our services" />
          </Grid>
          {/* 2nd Column Second Sub-Column */}
          <Grid item xs={6} lg={4} md={6} sm={6}>
            <LinkComponent linkArray={aboutAndContact} title="About us" />
          </Grid>
          {/* 2nd Column Third Sub-Column */}
          <Grid item xs={12} lg={4} md={12} sm={12}>
            <Box mt={{ lg: "0px", md: "0px", sm: "32px", xs: "32px" }}>
              <Typography
                fontFamily="HankenGroteskExtraBold"
                fontWeight={800}
                fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
                lineHeight={{
                  lg: "26px",
                  md: "26px",
                  sm: "23.4px",
                  xs: "23.4px",
                }}
                letterSpacing="-2%"
                color="rgba(255, 255, 255, 1)"
              >
                Branches
              </Typography>
              <Grid container spacing="12px">
                {branchData.map((branch, index) => (
                  <Grid item lg={12} md={12} sm={6} xs={6} key={index}>
                    <BranchComponent
                      branch={branch.branch}
                      street={branch.street}
                      location={branch.location}
                      phone={branch.phone}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Divider
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.2)",
          my: "20px",
        }}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection={{ lg: "row", md: "row", sm: "row", xs: "column" }}
        gap="23px"
      >
        <Box
          display="flex"
          gap={{ lg: "14px", md: "20px", sm: "12px", xs: "8px" }}
          justifyContent={{
            lg: "center",
            md: "center",
            sm: "flex-start",
            xs: "flex-start",
          }}
          alignItems="center"
        >
          <a
            target="_blank"
            href="/privacy-policy"
            style={{ display: "inline-flex", alignItems: "flex-start" }}
            rel="noreferrer"
          >
            <Typography
              fontFamily="HankenGroteskRegular"
              fontWeight={400}
              fontSize="14px"
              lineHeight={{
                lg: "20.8px",
                md: "20.8px",
                sm: "14px",
                xs: "14px",
              }}
              color="rgba(214, 214, 214, 0.8)"
              sx={{ textDecoration: "underline" }}
            >
              Privacy policy
            </Typography>
          </a>
          <SmallDot />
          <a
            target="_blank"
            rel="noreferrer"
            href="/terms-condition"
            style={{ display: "inline-flex", alignItems: "flex-start" }}
          >
            <Typography
              fontFamily="HankenGroteskRegular"
              fontWeight={400}
              fontSize="14px"
              lineHeight={{
                lg: "20.8px",
                md: "20.8px",
                sm: "14px",
                xs: "14px",
              }}
              color="rgba(214, 214, 214, 0.8)"
              sx={{ textDecoration: "underline" }}
            >
              Terms & conditions
            </Typography>
          </a>
          <SmallDot />
          <a
            target="_blank"
            rel="noreferrer"
            href="/sitemap"
            style={{ display: "inline-flex", alignItems: "flex-start" }}
          >
            <Typography
              fontFamily="HankenGroteskRegular"
              fontWeight={400}
              fontSize="14px"
              lineHeight={{
                lg: "20.8px",
                md: "20.8px",
                sm: "14px",
                xs: "14px",
              }}
              color="rgba(214, 214, 214, 0.8)"
              sx={{ textDecoration: "underline" }}
            >
              Sitemap
            </Typography>
          </a>
          <SmallDot />
          <a
            target="_blank"
            rel="noreferrer"
            href="/faq"
            style={{ display: "inline-flex", alignItems: "flex-start" }}
          >
            <Typography
              fontFamily="HankenGroteskRegular"
              fontWeight={400}
              fontSize="14px"
              lineHeight={{
                lg: "20.8px",
                md: "20.8px",
                sm: "14px",
                xs: "14px",
              }}
              color="rgba(214, 214, 214, 0.8)"
              sx={{ textDecoration: "underline" }}
            >
              FAQ
            </Typography>
          </a>
        </Box>
        <Box
        // textAlign={"center"}
        >
          <Typography
            fontFamily="HankenGroteskRegular"
            fontWeight={400}
            fontSize={{ lg: "14px", md: "14px", sm: "12px", xs: "12px" }}
            lineHeight={{ lg: "19.6px", md: "19.6px", sm: "12px", xs: "12px" }}
            color="rgba(255, 255, 255, 0.8)"
            letterSpacing="1%"
          >
            © WiseAdmit.io 2023 All Right Reserved
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.2)",
          my: { lg: "20px", md: "20px", sm: "0px", xs: "0px" },
          display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
        }}
      />
    </RootContainer>
  );
}
