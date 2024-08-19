"use client";
import { RootContainer } from "@/components/common";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React from "react";

const AboutMission = () => {
	const isMobile = useMediaQuery("(max-width:600px)");
	return (
		<Box
			p={{ lg: "110px 0px", md: "110px 0px", sm: "80px 0px", xs: "80px 0px" }}
			bgcolor="rgba(236, 238, 255, 1)"
		>
			<RootContainer>
				<Box
					display="flex"
					alignItems="center"
					flexDirection={{
						lg: "row",
						md: "row",
						sm: "column-reverse",
						xs: "column-reverse",
					}}
					gap="20px"
					justifyContent="space-between"
				>
					<Box
						mt={{
							sm: "15px",
						}}
						flex={0.5}
						display="flex"
						flexDirection="column"
					>
						<Typography
							color="rgba(32, 28, 26, 0.55)"
							fontSize={{
								lg: "14px",
								md: "14px",
								sm: "14px",
								xs: "14px",
							}}
							fontWeight={600}
							component="span"
						>
							Our Mission
						</Typography>
						{isMobile ? (
							<Typography
								fontSize={{
									lg: "32px",
									md: "32px",
									sm: "24px",
									xs: "24px",
								}}
								fontFamily="HankenGroteskExtraBold"
								fontWeight={800}
								lineHeight={{
									lg: "41.6px",
									md: "41.6px",
									sm: "31px",
									xs: "31px",
								}}
								mt="12px"
							>
								WiseAdmit aims to empower future leaders through access to{" "}
								<Typography
									fontSize={{
										lg: "32px",
										md: "32px",
										sm: "24px",
										xs: "24px",
									}}
									fontFamily="HankenGroteskExtraBold"
									fontWeight={800}
									lineHeight={{
										lg: "41.6px",
										md: "41.6px",
										sm: "31px",
										xs: "31px",
									}}
									color="rgba(170, 68, 1, 1)"
									borderBottom="6px dotted rgba(170, 68, 1, 1)"
								>
									affordable education
								</Typography>
							</Typography>
						) : (
							<Typography
								fontSize={{
									lg: "32px",
									md: "32px",
									sm: "24px",
									xs: "24px",
								}}
								fontFamily="HankenGroteskExtraBold"
								fontWeight={800}
								lineHeight={{
									lg: "41.6px",
									md: "41.6px",
									sm: "31px",
									xs: "31px",
								}}
								mt="12px"
							>
								WiseAdmit aims to empower <br /> future leaders through access{" "}
								<br />
								to{" "}
								<Typography
									fontSize={{
										lg: "32px",
										md: "32px",
										sm: "24px",
										xs: "24px",
									}}
									fontFamily="HankenGroteskExtraBold"
									fontWeight={800}
									lineHeight={{
										lg: "41.6px",
										md: "41.6px",
										sm: "31px",
										xs: "31px",
									}}
									color="rgba(170, 68, 1, 1)"
									borderBottom="6px dotted rgba(170, 68, 1, 1)"
								>
									affordable education
								</Typography>
							</Typography>
						)}

						<Typography
							fontSize={{
								lg: "18px",
								md: "18px",
								sm: "14px",
								xs: "14px",
							}}
							width={{ lg: "495px", md: "450px", sm: "100%", xs: "100%" }}
							color="rgba(32, 28, 26, 0.9)"
							mt="24px"
							lineHeight="23.4px"
							component="p"
						>
							With our innovative technology, we uplift students from
							underrepresented countries to reach their potential, promoting
							lifelong learning, resilience, and ambition.
							<br />
							<br />
							Take a leap into the future of global education with WiseAdmit. We
							are more than an admission service, we are a movement that aims to
							empower every student to write their own success story. Together,
							let’s inspire the next generation of global leaders.
						</Typography>
					</Box>
					<Box>
						<Image
							src="/images/about/mission.png"
							alt="mission"
							width={isMobile ? 300 : 500}
							height={isMobile ? 229 : 369}
						/>
					</Box>
				</Box>
			</RootContainer>
		</Box>
	);
};

export default AboutMission;
