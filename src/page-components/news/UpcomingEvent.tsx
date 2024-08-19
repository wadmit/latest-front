import React from "react";
import { Box,  Stack, Typography } from "@mui/material";
import { RootContainer } from "@/components/common";
import { CalenderSvg, CalenderTiltedSvg, LocationSvg } from "@/page-components/news/svgs";
import { Card, eventDetails, Wrapper } from "@/page-components/news/utils/provider";

function UpcommingEvent() {
	return (
		<Wrapper position={"relative"}>
		<RootContainer>
			<Stack direction="column" alignItems="center" justifyContent="center">
				<Typography
					mb="24px"
					display="flex"
					alignItems="center"
					fontSize={{ lg: '28px', xs: '16px' }}
					lineHeight={{ lg: '28px', xs: '24px' }}
					variant='h5'
					color="rgba(255, 255, 255, 0.35)"
					letterSpacing="-0.84px"
					fontFamily="HankenGroteskExtrabold"
				>
					{/* <CalenderSvg /> */}
					Upcoming event
				</Typography>
				<Typography
					mb="16px"
					fontSize={{ lg: '20px', xs: '16px' }}
					lineHeight={{ lg: '28px', xs: '20.8px' }}
					color="rgba(255, 255, 255, 0.85)"
					fontFamily="HankenGroteskRegular"
				>
					WiseAdmit is coming near you!
				</Typography>
				<Stack direction={"row"} alignItems={"center"} justifyContent={"center"} flexWrap={'wrap'} gap={"20px"}>
					{eventDetails.map((m) => {
						return (
							<>
								<Card gap={"16px"}>
									<Stack direction={"row"} gap={"12px"} alignItems={"center"}>
										<LocationSvg />
										<Typography
											fontSize={{ lg: '20px' }}
											lineHeight={{ lg: '20px' }}
											color="#000000"
											fontFamily="HankenGroteskSemiBold"
										>
											{m.location}
										</Typography>
									</Stack>
									<Typography
										fontSize={{ lg: '14px' }}
										ml={1}
										lineHeight={{ lg: '20px' }}
										color="rgba(0, 0, 0, 0.75)"
										fontFamily="HankenGroteskRegular"
									>
										{m.date}
									</Typography>
								</Card >
							</>
						)
					})}
				</Stack>
			</Stack>
		</RootContainer>
		<Box bottom={40} right={100} sx={{
			// transform: "rotate(38.077deg)"
		}} position={"absolute"}>
			<CalenderSvg />
		</Box>
		<Box bottom={-7} right={0} sx={{
			// transform: "rotate(38.077deg)"
		}} position={"absolute"}>
			<CalenderTiltedSvg />
		</Box>
	</Wrapper >
	);
}

export default UpcommingEvent;
