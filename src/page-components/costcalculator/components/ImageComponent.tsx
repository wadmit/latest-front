"use client";
import { Box } from "@mui/material";
import Image from "next/image";
import costCalculator from "$/images/costcalculator/cost-calculator.png";
import { wrapperDisplayStyle } from "@/page-components/costcalculator/utils/provider";

function ImageComponent() {
	return (
		<Box
			sx={{ position: "absolute", top: "0px", right: "0", zIndex: "-100" }}
			display={wrapperDisplayStyle}
		>
			<Box position="relative">
				<Box
					position="relative"
					height="362.805px"
					width="480px"
					borderRadius={8}
					overflow="hidden"
				>
					<Image
						src={costCalculator}
						alt="img-Homepage"
						layout="fill"
						objectFit="cover"
					/>
				</Box>
			</Box>
		</Box>
	);
}

export default ImageComponent;
