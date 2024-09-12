import { WiseAdmitColorFulSvg } from "public/svg";
import { RootContainer } from "@/components/common";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function NavbarSignInUp() {
	const router = useRouter();
	return (
		<RootContainer position="relative">
			<Box
				height="5rem"
				position="sticky"
				top="0rem"
				width="100%"
				zIndex={900}
				boxShadow={1}
				bgcolor="#FFF8F4"
				display={{
					xs: "flex",
					sm: "flex",
					md: "none",
					lg: "none",
					xl: "none",
				}}
				alignItems="center"
				justifyContent="space-between"
				component="header"
				onClick={() => router.push("/")}
				sx={{
					cursor: "pointer",
				}}
			>
				<WiseAdmitColorFulSvg />
				<CloseIcon onClick={() => router.back()} />
			</Box>
		</RootContainer>
	);
}

export default NavbarSignInUp;
