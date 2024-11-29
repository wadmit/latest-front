"use client";
import { IScholarshipResponse } from "@/types/utils";
import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import Image from "next/image";

import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import SchImg from "public/images/scholarships/schimg.png";
import {
  PersonRequest,
  PersonVerify,
} from "@/page-components/scholarships/utils/svg";
import { ClickableArrowScholarship } from "public/svg";
import BlogBodyCardSkeleton from "@/page-components/blog/component/BlogSkeleton";
import { scholarshipStyles } from "@/page-components/scholarships/utils/provider";
import ScholarshipSearch from "./ScholarshipSearch";
import Link from "next/link";
import applicationConfig from "@/config";
import { IScholarships } from "@/types/scholarship";
import { ITag } from "@/types/tag";

type Props = {
  allScholarships: IScholarshipResponse;
  loading: boolean;
  handleSearch: (searchTermData: string) => void;
  getConvertedCosts: (
    value: number,
    base_currency: string
  ) => {
    formattedValue: string;
    amount: number;
  };
};

SwiperCore.use([Navigation, Pagination]);

const AvailableScholarshipBody = ({
  loading,
  allScholarships,
  handleSearch,
  getConvertedCosts,
}: Props) => {
  const swiperRef = useRef(null) as any;
  const imageUrl = applicationConfig.distributionKey;
  const [filteredScholarships, setFilteredScholarships] = useState(
    allScholarships?.data || []
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setFilteredScholarships(allScholarships?.data || []);
  }, [allScholarships]);

  const handleSearchLocal = (searchTermData: string) => {
    setSearchTerm(searchTermData);
    handleSearch(searchTermData);

    if (searchTermData.trim() === "") {
      setFilteredScholarships(allScholarships?.data || []);
    } else {
      const filtered = allScholarships?.data.filter((scholarship: any) =>
        scholarship.name.toLowerCase().includes(searchTermData.toLowerCase())
      );
      setFilteredScholarships(filtered || []);
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const getScholarshipTypeStyle = (tag: ITag) => {
    // if (!type) return scholarshipStyles["NOTHING"];
    const formattedType = tag.name.toUpperCase();
    return scholarshipStyles[formattedType];
  };

  if (loading) {
    return (
      <>
        {Array.from(Array(3).keys()).map((item) => (
          <BlogBodyCardSkeleton key={item} />
        ))}
      </>
    );
  }

  if (!allScholarships || allScholarships.data.length === 0) {
    return (
      <Typography variant="h6" component="h6">
        No scholarship Found
      </Typography>
    );
  }

  return (
    <Box>
      <ScholarshipSearch handleSearch={handleSearchLocal} />
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }} // Enable navigation arrows
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: function (swiper, current, total) {
            return `<div class="swiper-pagination">
                      <div class="swiper-button-prev"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-pagination-bullet"></div>
                      <div class="swiper-button-next"></div>
                    </div>`;
          },
        }} // Enable pagination
        breakpoints={{
          290: {
            slidesPerView: 1,
          },
          // 340: {
          //   slidesPerView: 1,
          // },
          700: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
        {filteredScholarships.map(
          (scholarship: IScholarships, index: number) => {
            return (
              <SwiperSlide key={index}>
                <Box display="flex">
                  <Box
                    bgcolor="rgba(255, 255, 255, 1)"
                    height="310px"
                    width={{ lg: "355px", md: "355px", sm: "100%", xs: "100%" }}
                    display="flex"
                    flexDirection="column"
                    borderRadius="12px"
                    gap="12px"
                    padding="12px"
                    sx={{
                      cursor: "pointer",
                      transition:
                        "all .3s cubic- bezier(0.19, 1, 0.22, 1) ease",
                      "&:hover": {
                        transform: "scale(1)",
                      },
                    }}
                  >
                    <Box
                      height="157px"
                      width={{
                        lg: "100%",
                        md: "353px",
                        sm: "100%",
                        xs: "100%",
                      }}
                      borderRadius="8px"
                      overflow="hidden"
                    >
                      <Image
                        layout="responsive"
                        alt="Scholarship"
                        width={100}
                        height={1}
                        src={
                          scholarship.coverImage
                            ? `${imageUrl}/${scholarship.coverImage}`
                            : SchImg
                        }
                        // src={SchImg}
                      />
                    </Box>

                    <Box display="flex" gap="8px">
                      {scholarship?.tags &&
                        scholarship?.tags.length > 0 &&
                        scholarship?.tags.map((tag: ITag, idx: number) => {
                          const style = getScholarshipTypeStyle(tag);
                          return (
                            <Box
                              key={idx}
                              bgcolor={style.bgColor}
                              padding={{
                                lg: "4px 6px",
                                md: "4px 6px",
                                sm: "2px 4px",
                                xs: "2px 4px",
                              }}
                            >
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
                      fontSize={{
                        lg: "20px",
                        md: "20px",
                        sm: "18px",
                        xs: "18px",
                      }}
                      lineHeight={{
                        lg: "26px",
                        md: "26px",
                        sm: "23.4px",
                        xs: "23.4px",
                      }}
                      letterSpacing="-2%"
                      color="rgba(32, 28, 26, 1)"
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Link href={`/scholarships/${scholarship.slug}`}>
                        {scholarship.name}
                      </Link>
                    </Typography>
                    <Divider />
                    <Box
                      display="flex"
                      alignItems={{
                        lg: "center",
                        md: "center",
                        sm: "none",
                        xs: "none",
                      }}
                      justifyContent="space-between"
                      flexDirection={{
                        lg: "row",
                        md: "row",
                        sm: "column",
                        xs: "column",
                      }}
                      gap={{ lg: "0px", md: "0px", sm: "12px", xs: "12px" }}
                      mt="16px"
                    >
                      {/* <Box display="flex" alignItems="center" gap="4px">
                        <PersonRequest />
                        <Typography
                          fontWeight={400}
                          fontFamily="HankenGroteskRegular"
                          fontSize="14px"
                          lineHeight="19.6px"
                          color="rgba(32, 28, 26, 0.55)"
                        >
                          Scholarships:
                        </Typography>
                        <Typography
                          fontWeight={400}
                          fontFamily="HankenGroteskRegular"
                          fontSize="14px"
                          lineHeight="19.6px"
                          color="rgba(32, 28, 26, 1)"
                        >
                          {scholarship?.scholarship?.totalScholarshipRecipients
                            ? scholarship?.scholarship
                                ?.totalScholarshipRecipients
                            : 0}
                        </Typography>
                      </Box> */}

                      <Box display="flex" alignItems="center" gap="4px">
                        <PersonVerify />
                        <Typography
                          fontWeight={400}
                          fontFamily="HankenGroteskRegular"
                          fontSize="14px"
                          lineHeight="19.6px"
                          color="rgba(32, 28, 26, 0.55)"
                        >
                          Value:
                        </Typography>
                        <Typography
                          fontWeight={400}
                          fontFamily="HankenGroteskRegular"
                          fontSize="14px"
                          lineHeight="19.6px"
                          color="rgba(32, 28, 26, 1)"
                        >
                          {
                            getConvertedCosts(
                              scholarship?.amount ?? 0,
                              scholarship?.currency
                            ).formattedValue
                          }
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        marginTop="32px"
      >
        <Button
          id="Left Crow"
          aria-label="Left Crow"
          onClick={slidePrev}
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "100%",
            height: "36px",
            width: "36px",
            minWidth: 0,
            padding: 0,
          }}
        >
          <ClickableArrowScholarship direction="left" />
        </Button>
        <Button
          id="Right crow"
          aria-label="Right crow"
          onClick={slideNext}
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "100%",
            height: "36px",
            width: "36px",
            minWidth: 0,
            padding: 0,
          }}
        >
          <ClickableArrowScholarship direction="right" />
        </Button>
      </Box>
    </Box>
  );
};

export default AvailableScholarshipBody;
