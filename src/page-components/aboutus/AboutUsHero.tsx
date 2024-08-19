"use client";
import { RootContainer } from "@/components/common";
import { Box, Typography, useMediaQuery } from "@mui/material";

const AboutUsHero = () => {
	const isMobile = useMediaQuery("(max-width:685px)");
	return (
		<RootContainer mt={5} mb={{ xs: 5, sm: 5, md: 10, lg: 10 }}>
			<Box display="flex" justifyContent="center" padding="30px 0px">
				<Box
					display="flex"
					alignItems="center"
					flexDirection="column"
					textAlign="center"
				>
					<Typography
						textAlign="center"
						component="h1"
						fontSize="14px"
						fontWeight={600}
						color="rgba(32, 28, 26, 0.55)"
					>
						The WiseAdmit Story
					</Typography>
					{isMobile ? (
						<Typography
							component="h2"
							fontFamily="HankenGroteskExtraBold"
							fontSize={{
								xs: "26px",
								sm: "28px",
								md: "32px",
								lg: "32px",
								xl: "32px",
							}}
							fontWeight={800}
							mt="12px"
							lineHeight="36.6px"
						>
							At WiseAdmit, we&apos;re on a mission to make{" "}
							<Typography
								color="rgba(170, 68, 1, 1)"
								fontSize={{
									xs: "26px",
									sm: "28px",
									md: "32px",
									lg: "32px",
									xl: "32px",
								}}
								fontFamily="HankenGroteskExtraBold"
								borderBottom="6px dotted rgba(170, 68, 1, 1)"
								fontWeight={800}
								lineHeight="36.6px"
							>
								quality education accessible
							</Typography>{" "}
							to all{" "}
						</Typography>
					) : (
						<Typography
							component="h2"
							fontFamily="HankenGroteskExtraBold"
							fontSize="32px"
							fontWeight={800}
							mt="12px"
							lineHeight="41.6px"
						>
							At WiseAdmit, we&apos;re on a mission to
							<br />
							make{" "}
							<Typography
								color="rgba(170, 68, 1, 1)"
								fontFamily="HankenGroteskExtraBold"
								fontSize="32px"
								fontWeight={800}
								borderBottom="6px dotted rgba(170, 68, 1, 1)"
								lineHeight="41.6px"
							>
								quality education accessible
							</Typography>{" "}
							to all{" "}
						</Typography>
					)}

					<Box
						mt="36px"
						minWidth={{
							xs: "100%",
							sm: "100%",
							md: "80%",
							lg: "554px",
							xl: "554px",
						}}
						width={{
							xs: "100%",
							sm: "100%",
							md: "80%",
							lg: "50%",
							xl: "50%",
						}}
					>
						<Typography
							color="rgba(32, 28, 26, 0.9)"
							fontSize={{
								xs: "14px",
								sm: "14px",
								md: "18px",
								lg: "18px",
							}}
							fontWeight={400}
							lineHeight="23.4px"
							component="p"
						>
							Founded in 2006 by Rupesh Regmi, our journey began with a vision
							to democratize educational opportunities. Through our innovative
							WiseScore Technology, we match students with the right
							universities and scholarships, making higher education dreams a
							reality. <br />
							<br />
							We believe education is transformative and strive to ensure every
							student has the chance to succeed. Our diverse team is committed
							to excellence, transparency, and the belief in the power of
							education.
						</Typography>
					</Box>
				</Box>
			</Box>
		</RootContainer>
	);
};

export default AboutUsHero;
