"use client";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import CountUp from "react-countup";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { universityImages } from "../students/utils/provider";

function PartnerUniversity() {
	SwiperCore.use([Autoplay]);

	const ref = React.useRef(null);
	// check if visible
	const isMobile = useMediaQuery("(max-width:600px)");
	return (
		<Box
			ref={ref}
			width="100%"
			display="flex"
			flexDirection="column"
			alignItems="center"
		>
			{isMobile ? (
				<Typography
					fontSize="18px !important"
					fontFamily="HankenGroteskExtraBold"
					lineHeight="31.2px"
					letterSpacing="-2%"
					mt="86px"
					component={"h5"}
				>
					Partner who love us
				</Typography>
			) : (
				<Typography
					fontSize="24px"
					fontFamily="HankenGroteskExtraBold"
					lineHeight="31.2px"
					component={"h5"}
					letterSpacing="-2%"
					mt="104px"
					color="rgba(0, 0, 0, 0.6)"
				>
					We are partners with over{" "}
					<CountUp end={100} scrollSpyOnce enableScrollSpy /> Chinese
					universities
				</Typography>
			)}

			<Box
				width="100%"
				sx={{
					overflowx: "scroll",
					"&::-webkit-scrollbar": {
						display: "none",
					},
					"&  .swiper-wrapper": {
						transitionTimingFunction: "linear !important",
					},
				}}
				display="flex"
				justifyContent="center"
				alignItems="center"
				mt={{ lg: "28px", md: "28px", sm: "34px", xs: "34px" }}
			>
				<Swiper
					modules={[Autoplay]}
					loop
					slidesPerView={10}
					speed={1500}
					autoplay={{
						delay: 0,
						disableOnInteraction: false,
					}}
					breakpoints={{
						0: {
							slidesPerView: 4,
							spaceBetween: 10,
						},
						600: {
							slidesPerView: 5,
							spaceBetween: 10,
						},
						960: {
							slidesPerView: 8,
							spaceBetween: 10,
						},
						1280: {
							slidesPerView: 10,
							spaceBetween: 10,
						},
					}}
				>
					{universityImages.map((image, index) => (
						<SwiperSlide key={index}>
							<img
								loading="lazy"
								alt="University Logo"
								style={{
									aspectRatio: "4/3",
									objectFit: "cover",
									width: "68px",
									height: "68px",
								}}
								src={image}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</Box>
	);
}

export default PartnerUniversity;
