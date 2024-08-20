"use client";
import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import { menuListItem } from "@/page-components/institution/utils/provider";
import { RootContainer } from "@/components/common";

function MenuSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 820px)");

  return (
    <RootContainer>
      <Box
        mt={{ lg: "124px", md: "124px", sm: "40px", xs: "40px" }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        mb="100px"
      >
        <Box flex={0.35} gap="30px" display="flex" flexDirection="column">
          {menuListItem.map((menu, index) => (
            <Box
              sx={{
                cursor: "pointer",
              }}
              display="flex"
              flexDirection="column"
              onClick={() => setActiveIndex(index)}
              key={menu.title}
            >
              <Typography
                color={
                  index === activeIndex
                    ? "rgba(32, 28, 26, 0.95)"
                    : "rgba(32, 28, 26, 0.55)"
                }
                fontFamily="HankenGroteskExtraBold"
                lineHeight="41.6px"
                fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "24px" }}
              >
                {menu.title}
              </Typography>
              {index === activeIndex && (
                <Typography
                  maxWidth="396px"
                  mt="19px"
                  fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
                  fontFamily="HankenGroteskRegular"
                  color="rgba(32, 28, 26, 0.9)"
                >
                  {menu.subTitle}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
        {/* for image */}
        <Box
          mt={{ lg: "0px", md: "0px", sm: "18px", xs: "18px" }}
          flex={{ lg: 0.55, md: 0.55, sm: 1, xs: 1 }}
          width={{
            lg: "auto",
            md: "auto",
            sm: "100%",
            xs: "100%",
          }}
          height={{
            lg: "550px",
            md: "550px",
            sm: "330px",
            xs: "330px",
          }}
        >
          <AnimatePresence>
            {menuListItem.map(
              (menu, index) =>
                index === activeIndex && (
                  <motion.img
                    key={menu.title}
                    width="100%"
                    height={isMobile ? "300px" : "auto"}
                    src={menu.imageUrl}
                    alt={menu.title}
                    initial={{ opacity: 0 }} // Initial state before animation
                    animate={{ opacity: 5 }} // Target state of the animation
                    exit={{ opacity: 0, display: "none" }} // State when component is removed from DOM
                    transition={{ duration: 0.5, ease: "easeOut" }} // Transition duration and easing
                  />
                )
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </RootContainer>
  );
}

export default MenuSwiper;
