import React from "react";
import { Box, Typography } from "@mui/material";
import { StyledCard } from "@/page-components/recruiting-partners/components/StyledCard";
import type { IBecomePartnerCardProp } from "@/page-components/recruiting-partners/utils/types";

function BecomeOurPartnerCard({
	title,
	desc,
	color,
	children,
}: IBecomePartnerCardProp) {
	return (
		<StyledCard>
			<Box>
				<Box display="flex" flexDirection="column" gap="16px">
					<Box display="flex" gap="12px">
						{children}
						<Typography
							component={"h1"}
							fontFamily="HankenGroteskExtraBold"
							fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
							lineHeight={{ lg: "26px", md: "26px", sm: "24px", xs: "23.4px" }}
							letterSpacing="-2%"
							color="rgba(0, 0, 0, 1)"
						>
							{title}
						</Typography>
					</Box>
					<Box>
						<Typography
							component={"p"}
							fontFamily="HankenGroteskRegular"
							fontSize={{ lg: "16px", md: "16px", sm: "16px", xs: "14px" }}
							lineHeight={{
								lg: "20.8px",
								md: "20.8px",
								sm: "20.4px",
								xs: "18.2px",
							}}
							color="rgba(32, 28, 26, 0.9)"
						>
							{desc}
						</Typography>
					</Box>
				</Box>
			</Box>
		</StyledCard>
	);
}
export default BecomeOurPartnerCard;
