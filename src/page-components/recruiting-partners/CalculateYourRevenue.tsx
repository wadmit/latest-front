"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import bigEllipse from "$/images/partners/big-ellipse.webp";
import smallEllipse from "$/images/partners/small-ellipse.webp";
import { ButtonWrapper, RootContainer } from "@/components/common";

function CalculateYourRevenue() {
	const router = useRouter();
	return (
		<RootContainer>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				mt={{ lg: "136px", md: "126px", sm: "150px", xs: "145px" }}
			>
				<Box display="flex" flexDirection="column">
					<Box
						position="relative"
						top={{ lg: "225px", md: "218px", sm: "155px", xs: "145px" }}
						left={{ lg: "85px", md: "55px", sm: "5px", xs: "2px" }}
					>
						<Image alt="ellipse-nine" src={smallEllipse} width={1000} height={107} style={{width: 637}} />
					</Box>
					<Box
						position="relative"
						top="105px"
						left="-4px"
						display={{ lg: "flex", md: "flex", sm: "none", xs: "none" }}
					>
						<Image alt="ellipse-eight" src={bigEllipse} width={1000} height={134} style={{width: 786}}/>
					</Box>
				</Box>
				<Box
					bgcolor="rgba(239, 233, 174, 1)"
					width={{ lg: "605px", md: "605px", sm: "400px", xs: "342px" }}
					height="290px"
					borderRadius="24px"
					position="absolute"
					zIndex={1111}
				>
					<Box display="flex" flexDirection="column" padding="48px">
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
							gap="20px"
						>
							<Typography
								component={"h1"}
								fontFamily="HankenGroteskExtraBold"
								fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "20px" }}
								lineHeight="36.4px"
								letterSpacing="-3%"
								color="rgba(32, 28, 26, 0.9)"
								textAlign="center"
							>
								Calculate your revenue with WiseAdmit
							</Typography>

							<Typography
								component={"p"}
								fontFamily="HankenGroteskRegular"
								fontSize={{ lg: "16px", md: "16px", sm: "16px", xs: "14px" }}
								lineHeight="20.8px"
								color="rgba(32, 28, 26, 0.9)"
								textAlign="center"
							>
								Enter the required information below and estimate your earnings
								with WiseAdmit
							</Typography>
						</Box>
						<Box
							mt={{ lg: "48px", md: "48px", sm: "40px", xs: "18px" }}
							display="flex"
							justifyContent="center"
							alignItems="center"
						>
							<ButtonWrapper
								variant="contained"
								onClick={() => router.push("/revenue-calculator")}
								sx={{
									width: "15rem",
									borderRadius: "8px",
									textTransform: "none",
								}}
							>
								Calculate now
							</ButtonWrapper>
						</Box>
					</Box>
				</Box>
			</Box>
		</RootContainer>
	);
}

export default CalculateYourRevenue;
