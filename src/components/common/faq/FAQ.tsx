"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { RootContainer } from "../wrapper/RootContainer";
import {
	FaqSectionFoundation,
	FaqSectionFoundationSlice,
} from "@/page-components/programs/components/FoundationFAQ";

const FAQ = React.forwardRef((unknown, ref) => {
	const [readMore, setReadMore] = useState(false);
	const handleToggleReadMore = () => {
		setReadMore((prev) => !prev);
	};
	return (
		<RootContainer mt={{ lg: "76px", md: "56px", sm: "44px", xs: "14px" }}>
			<Box
				id="faq"
				borderRadius="8px"
				// border="1px solid #E9E9E9"
				bgcolor="white"
				p={3}
				display="flex"
				flexDirection="column"
				gap="10px"
			>
				<Box flex="1" display="flex" flexDirection="column" gap="16px">
					<Typography
						component="h3"
						fontSize={{ lg: "32px", md: "32px", sm: "28px", xs: "20px" }}
						fontFamily="HankenGroteskExtraBold"
						lineHeight={{
							lg: "41.6px",
							md: "41.6px",
							sm: "38.8px",
							xs: "26px",
						}}
						letterSpacing="-2%"
						color="rgba(32, 28, 26, 1)"
					>
						Frequently asked questions (FAQ)
					</Typography>
				</Box>
				<Box mt={{ lg: "50px", md: "46px", sm: "34px", xs: "24px" }}>
					{readMore ? <FaqSectionFoundation /> : <FaqSectionFoundationSlice />}
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					mt={{ lg: "48px", md: "48px", sm: "30px", xs: "24px" }}
				>
					<Button
						sx={{
							border: "1px solid var(--icon-disable, #A3A3A9)",
							borderRadius: "8px",
							background: "white",
							padding: "19px 42px",
							width: "fit-content",
							minHeight: { lg: "48px", md: "48px", sm: "40px", xs: "38px" },
							minWidth: { lg: "164px", md: "164px", sm: "130px", xs: "130px" },
						}}
						onClick={handleToggleReadMore}
					>
						<Typography
							fontSize="14px"
							fontStyle="normal"
							fontFamily="HankenGroteskSemiBold"
							lineHeight="120%"
							color="#FF6B26"
							component={"p"}
							textAlign="center"
							textTransform="none"
						>
							{readMore ? "Load Less" : "See all FAQs"}
						</Typography>
					</Button>
				</Box>
			</Box>
		</RootContainer>
	);
});

export default FAQ;
