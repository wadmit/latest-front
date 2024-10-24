"use client";
import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

import { menuListItem } from "@/page-components/institution/utils/provider";
import { RootContainer } from "@/components/common";

function MenuSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 820px)");
  const menuItemVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay each child animation
      },
    },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: 200, scale: 0.9 },  // Start off to the right
    show: {
      opacity: 1,
      x: 0,  // Slide in to original position
      scale: 1,
      transition: { type: "spring", duration: 0.8 }, // Smooth transition
    },
    exit: {
      opacity: 0,
      x: -200,  // Slide out to the left
      scale: 0,
      transition: { duration: 0.2 },
    },
  };
  
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
          <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="menu-list"
          style={{
            flex: 0.35,
          }}
        >
        <Box  gap="30px" display="flex" flexDirection="column">
          {menuListItem.map((menu, index) => (
        <motion.div
        key={menu.title}
        variants={menuItemVariants}
        whileHover={{ scale: 1.05 }} // Hover effect
        whileTap={{ scale: 0.98 }} // Tap (click) effect
        onClick={() => setActiveIndex(index)}
        style={{ cursor: "pointer",display:"flex",flexDirection:"column" }}
      >
              <Typography
                color={
                  index === activeIndex
                    ? "rgba(32, 28, 26, 0.95)"
                    : "rgba(32, 28, 26, 0.55)"
                }
                fontFamily="HankenGroteskExtraBold"
                lineHeight={{
                  lg: "36.4px",
                  md: "36.4px",
                  sm: "31.2px",
                  xs: "31.2px",
                }}
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
            </motion.div>
          ))}
        </Box>
        </motion.div>
         {/* Image Swiper */}
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
          <AnimatePresence mode="wait">
            {menuListItem.map(
              (menu, index) =>
                index === activeIndex && (
                  <motion.img
                    key={menu.title}
                    width="100%"
                    height={isMobile ? "300px" : "600px"}
                    src={menu.imageUrl}
                    alt={menu.title}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={imageVariants}
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
