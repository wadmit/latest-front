"use client";
import { RootContainer } from "@/components/common";
import ImageComponent from "@/page-components/recruiting-partners/components/ImageComponent";
import TitleComponent from "@/components/common/shareble/TitleComponent";
import { PARTNER_URL_CONFIG } from "@/config/config";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import heroSectionBg from "$/images/partners/partner_recruiting_small.svg";

function RecruitingHero() {
	const router = useRouter();
	const isSmallScreen = useMediaQuery((theme: any) =>
		theme.breakpoints.down("sm"),
	);

	const description =
		"WiseAdmit is a one-stop admission solution for Study Abroad companies.We help you streamline the process of admission to over 100 world-class affordable universities with the greatest conversion rate by providing necessary APIs, Tools and Relations!.";
	return (
		<RootContainer mt={{ xl: "3.8125rem", xs: "2px" }} mb="6.8125rem">
			{isSmallScreen ? (
				<>
					<Image src={heroSectionBg} alt="img-Homepage" objectFit="cover" />
					<Box mt="2rem">
						<TitleComponent
							title={
								<>
									Scale your company with{" "}
									<Typography
										// component="strong"
										sx={{
											borderBottom: "6px dotted rgba(170, 68, 1, 1) !important",
											color: "rgba(170, 68, 1, 1) !important",
										}}
										// variant="inherit"
									>
										WiseAdmit
									</Typography>
								</>
							}
							desc={description}
						/>
						<Stack mt="2.5rem" direction="column" gap={2}>
							<Button
								onClick={() => router.push("/joinus")}
								sx={{
									bgcolor: "rgba(255, 107, 38, 1)",
									width: "fit-content",
									minWidth: "187px",
									borderRadius: "8px",
									padding: "16.5px 46px",
									mt: { lg: "43px", md: "43px", sm: "18px", xs: "18px" },
									color: "white",
									textTransform: "none",
								}}
							>
								Register as partner
							</Button>
							{/* <ButtonWrapper
                variant="contained"
                onClick={() => router.push('/joinus')}
                sx={{ width: '100%', borderRadius: '8px' }}
              >
                Register as partner
              </ButtonWrapper> */}
							{/* <ButtonWrapper
                variant="outlined"
                onClick={() => window.open(PARTNER_URL_CONFIG)}
                sx={{ width: '100%', borderRadius: '8px' }}
              >
                Partner's Sign in
              </ButtonWrapper> */}
							<Button
								onClick={() => window.open(PARTNER_URL_CONFIG)}
								sx={{
									bgcolor: "#FFFFFF",
									border: "1px solid rgba(131, 134, 139, 1)",
									width: "fit-content",
									minWidth: "187px",
									borderRadius: "8px",
									padding: "16.5px 46px",
									mt: { lg: "43px", md: "43px", sm: "18px", xs: "18px" },
									color: "rgba(255, 107, 38, 1)",
									textTransform: "none",
								}}
							>
								Partner's Sign in
							</Button>
						</Stack>
					</Box>
				</>
			) : (
				<Stack
					direction="row"
					alignItems="center"
					position="relative"
					gap="41px"
					minHeight="26.25rem"
				>
					<ImageComponent />
					<Box maxWidth={{ md: "37.5rem", lg: "387px", xl: "390px" }}>
						<TitleComponent
							title={
								<>
									Scale your company with{" "}
									<Typography
										component="strong"
										borderBottom="6px dotted rgba(170, 68, 1, 1)"
										color="rgba(170, 68, 1, 1)"
										variant="inherit"
									>
										WiseAdmit
									</Typography>
								</>
							}
							desc={description}
						/>
						<Stack
							mt="2.5rem"
							direction={{ lg: "row", xs: "column" }}
							justifyContent={{ md: "flex-start", xs: "flex-start" }}
							alignItems={{ md: "flex-start", xs: "flex-start" }}
							gap={1}
						>
							<Button
								onClick={() => router.push("/joinus")}
								sx={{
									borderRadius: "8px",
									padding: "12px 32px",
									bgcolor: "rgba(255, 107, 38, 1)",
									width: "fit-content",
									minHeight: "48px",
									minWidth: "187px",
									color: "white",
									textTransform: "none",
								}}
							>
								Register as partner
							</Button>
							<Button
								onClick={() => window.open(PARTNER_URL_CONFIG)}
								sx={{
									borderRadius: "8px",
									padding: "12px 32px",
									bgcolor: "white",
									width: "fit-content",
									minHeight: "48px",
									minWidth: "187px",
									color: "rgba(255, 107, 38, 1)",
									border: "1px solid rgba(131, 134, 139, 1)",
									textTransform: "none",
								}}
							>
								Partner's sign in
							</Button>
						</Stack>
					</Box>
				</Stack>
			)}
		</RootContainer>
	);
}

export default RecruitingHero;
