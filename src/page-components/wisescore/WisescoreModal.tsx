"use client";
import React, { useMemo } from "react";
import { Dialog } from "@mui/material";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import ScoreNavbar from "./ScoreNavbar";
import WiseScoreComponent from "./WiseScoreComponent";
type Props = {
	primaryColor: string;
	secondaryColor: string;
	Logo: React.FC;
	showModal: boolean;
	variant?: string;
	endPoint?: string;
	version?: string;
	closeModal: () => void;
};

function WiseScoreModal({
	version = "WiseScore",
	primaryColor,
	secondaryColor,
	Logo,
	endPoint = "/wisescore/wisescore-thankyou",
	variant = "",
	showModal,
	closeModal,
}: Props) {
	const contextValue = useMemo(
		() => ({
			primaryColor,
			secondaryColor,
			closeModal,
			variant,
			version,
			endPoint,
		}),
		[primaryColor, secondaryColor],
	);
	return (
		<WiseScoreDetailsContext.Provider value={contextValue}>
			<Dialog
				sx={{
					zIndex: 9999999,
				}}
				open={showModal}
				fullScreen
			>
				{/* <Stepper /> */}
				<ScoreNavbar Logo={Logo} />
				<WiseScoreComponent />
			</Dialog>
		</WiseScoreDetailsContext.Provider>
	);
}

export default WiseScoreModal;
