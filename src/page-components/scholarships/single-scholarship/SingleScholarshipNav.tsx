"use client";
import {
  INavbarMenu,
  RootContainer,
  StyledNavbar,
  StyledTabs,
} from "@/components/common";
import GlobalTab from "@/components/common/tab/GlobalTab";
import { Box, Tab, Typography } from "@mui/material";
import Link from "next/link";
import React, { MutableRefObject, useEffect, useState } from "react";

type Props = {
  navMenu: INavbarMenu[];
};

const SingleScholarshipNav = ({ navMenu }: Props) => {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number>(0);
  const [isClicked, setIsClicked] = useState(false);

  const sectionRefs: Record<
    string,
    React.MutableRefObject<HTMLElement>
  > = navMenu.reduce((acc, { name }) => {
    acc[name] = React.createRef() as MutableRefObject<HTMLElement>;
    return acc;
  }, {} as Record<string, React.MutableRefObject<HTMLElement>>);

  const scrollToSection = (index: number, link: string) => {
    const section = document.querySelector(link);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveMenuIndex(index);
      setIsClicked(true);
    }
  };

  const handleMenuClick = (index: number, link: string) => {
    setActiveMenuIndex(index);
    scrollToSection(index, link);
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeMenuItem = navMenu.findIndex(
          (item) => sectionRefs[item.name].current === entry.target
        );
        if (activeMenuItem !== -1 && !isClicked) {
          setActiveMenuIndex(activeMenuItem);
        }
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isClicked) {
        setIsClicked(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClicked]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    });

    navMenu.forEach(({ name, link }) => {
      if (link) {
        const section = document.querySelector(link);
        if (section) {
          observer.observe(section);
          sectionRefs[name].current = section as HTMLElement;
        }
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionRefs, navMenu]);

  return (
    // <RootContainer>
    <Box
      position="sticky"
      top="70px"
      display="flex"
      gap="30px"
      width={{ lg: "100%", md: "65%", sm: "100%", xs: "100%" }}
      zIndex={1}
      bgcolor="#F9F9F9"
    >
      {/* <GlobalTab tabMenu={navMenu} activeTab={activeMenuIndex} /> */}

      <StyledNavbar
        width="100%"
        // sx={{ ml: { lg: "0px", md: "0px", sm: "-40px", xs: "-40px" } }}
      >
        <StyledTabs
          // allowScrollButtonsMobile
          variant="scrollable"
          value={activeMenuIndex}
        >
          {navMenu.map((eachTab, index) => (
            <Tab
              key={eachTab.name}
              label={
                <Box>
                  <Link href={eachTab.link!}>
                    <Typography
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleMenuClick(index, eachTab.link ?? "")}
                      fontSize="16px"
                      fontFamily={
                        activeMenuIndex === index
                          ? "HankenGroteskBold"
                          : "HankenGroteskRegular"
                      }
                      color="rgba(32, 28, 26, 0.90)"
                    >
                      {eachTab.name}
                    </Typography>
                  </Link>
                </Box>
              }
              //   onClick={() => handleMenuClick(index, eachTab.link ?? "")}
              className={activeMenuIndex === index ? "active-tab-sch" : "tab"}
            />
          ))}
        </StyledTabs>
      </StyledNavbar>
    </Box>
    // </RootContainer>
  );
};

export default SingleScholarshipNav;
