"use client";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import {
	PartnerData,
	styles,
} from "@/page-components/recruiting-partners/utils/provider";
import { FillUpAFormSvg, GetReviewedSvg, StartEarningSvg } from "$/svg";
import { RootContainer } from "@/components/common";
import BecomeOurPartnerCard from "@/page-components/recruiting-partners/components/BecomeOurPartnerCard";

function getLogo(index: number) {
	switch (index) {
		case 0:
			return <FillUpAFormSvg />;
		case 1:
			return <GetReviewedSvg />;
		default:
			return <StartEarningSvg />;
	}
}

function BecomeOurPartner() {
	return (
		<RootContainer sx={styles} my={{ lg: 10, md: 6, sm: 5, xs: 8 }}>
			<Grid
				container
				gap={{ lg: "118px", md: "118px", sm: "70px", xs: "50px" }}
			>
				<Grid item lg={4.6} m={4} sm={12} xs={12}>
					<Box>
						<Typography
							mt={{ lg: 5, md: 5, sm: 3, xs: -7 }}
							variant="h4"
							component="h4"
							sx={{
								// textAlign: 'center',
								mb: "2.75rem",
								zIndex: 100,
							}}
							color="rgba(255, 255, 255, 1)"
						>
							Become our partners in <br />
							<Typography
								variant="h4"
								component="span"
								color="rgba(255, 243, 129, 1)"
								borderBottom="4px dotted rgba(255, 243, 129, 1)"
							>
								three easy steps
							</Typography>
						</Typography>
						<Image width={1000} style={{width: 385}} height={285} alt="Wiseadmit Team" src={"/images/partners/group-image.webp"} />
					</Box>
				</Grid>

				<Grid item lg={5.2} md={7} sm={12} xs={12}>
					<Box display="flex" flexDirection="column" gap="24px">
						{PartnerData.map((eachcard, index) => (
							<Box key={eachcard.title}>
								<BecomeOurPartnerCard
									color={eachcard.color}
									desc={eachcard.desc}
									title={eachcard.title}
								>
									{getLogo(index)}
								</BecomeOurPartnerCard>
							</Box>
						))}
					</Box>
				</Grid>
			</Grid>
		</RootContainer>
	);
}

export default BecomeOurPartner;
