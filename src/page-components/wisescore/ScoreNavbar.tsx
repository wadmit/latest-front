"use client";
import React, { useContext } from "react";
import Link from "next/link";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { Box, IconButton, Stack } from "@mui/material";
import { ScoreWrapper } from "./utils/provider";
import { CrossIcon } from "./svgs";

type Props = {
	Logo: React.FC;
};

function ScoreNavbar({ Logo }: Props) {
	const { closeModal } = useContext(WiseScoreDetailsContext);
	return (
		<Box
			height="5rem"
			position="sticky"
			top="0rem"
			width="100%"
			zIndex={99999999}
			boxShadow={1}
			display="flex"
			alignItems="center"
			justifyContent="center"
			component="header"
			bgcolor="#fff"
		>
			<ScoreWrapper
				sx={{
					position: "relative",
					width: "100%",
				}}
				component="nav"
			>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Link aria-label="WiseScore" href="/">
						<Logo />
					</Link>

					<Box display="flex" gap="20px" alignItems="center">
						{/* <Box
                            fontSize={{ lg: '16px', md: '14px', sm: '12px', xs: '12px' }}
                            fontFamily="HankenGroteskExtraBold"
                            padding="10px 16px"
                            borderRadius="32px"
                            border="1px solid #000"
                        >
                            Questions?
                        </Box> */}
						<IconButton id="close-modal" onClick={closeModal}>
							<CrossIcon />
						</IconButton>
					</Box>
				</Stack>
			</ScoreWrapper>
		</Box>
	);
}

export default ScoreNavbar;
