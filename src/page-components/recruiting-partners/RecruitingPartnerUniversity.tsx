"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { universityImages } from "@/page-components/students/utils/provider";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import CountUp from "react-countup";
function RecruitingPartnerUniversity() {
	SwiperCore.use([Autoplay]);

	const ref = useRef(null);
	const isMobile = useMediaQuery("(max-width:600px)");
	return (
		<Box
			ref={ref}
			width="100%"
			display="flex"
			flexDirection="column"
			alignItems="center"
			mt={{ lg: "195px", md: "175px", sm: "175px", xs: "175px" }}
		>
			{isMobile ? (
				<Typography
					component={"h1"}
					fontSize="18px !important"
					fontFamily="HankenGroteskExtraBold"
					lineHeight="31.2px"
					letterSpacing="-2%"
					color="rgba(0, 0, 0, 0.6)"
				>
					Trusted by <CountUp end={200} scrollSpyOnce enableScrollSpy />+ of
					universities
				</Typography>
			) : (
				<Typography
					component={"h1"}
					fontSize="20px"
					fontFamily="HankenGroteskExtraBold"
					lineHeight="31.2px"
					letterSpacing="-2%"
					color="rgba(0, 0, 0, 0.6)"
				>
					Trusted by <CountUp end={200} scrollSpyOnce enableScrollSpy />+ of
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
				mt="20px"
			>
				<Swiper
					modules={[Autoplay]}
					loop
					slidesPerView={10}
					spaceBetween={50}
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

export default RecruitingPartnerUniversity;
