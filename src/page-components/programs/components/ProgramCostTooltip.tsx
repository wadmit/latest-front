import { Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";

const ProgramCostTooltip = () => {
	const [isTooltipOpen, setIsTooltipOpen] = useState(false);

	const handleTooltipOpen = () => {
		setIsTooltipOpen(true);
	};

	const handleTooltipClose = () => {
		setIsTooltipOpen(false);
	};

	return (
		<React.Fragment>
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				onMouseEnter={handleTooltipOpen}
				onMouseLeave={handleTooltipClose}
			>
				<g clipPath="url(#clip0_8327_12512)">
					<path
						d="M9 17.0625C4.5525 17.0625 0.9375 13.4475 0.9375 9C0.9375 4.5525 4.5525 0.9375 9 0.9375C13.4475 0.9375 17.0625 4.5525 17.0625 9C17.0625 13.4475 13.4475 17.0625 9 17.0625ZM9 2.0625C5.175 2.0625 2.0625 5.175 2.0625 9C2.0625 12.825 5.175 15.9375 9 15.9375C12.825 15.9375 15.9375 12.825 15.9375 9C15.9375 5.175 12.825 2.0625 9 2.0625Z"
						fill="#201C1A"
						fillOpacity="0.55"
					/>
					<path
						d="M9 10.3125C8.6925 10.3125 8.4375 10.0575 8.4375 9.75V6C8.4375 5.6925 8.6925 5.4375 9 5.4375C9.3075 5.4375 9.5625 5.6925 9.5625 6V9.75C9.5625 10.0575 9.3075 10.3125 9 10.3125Z"
						fill="#201C1A"
						fillOpacity="0.55"
					/>
					<path
						d="M9 12.7499C8.9025 12.7499 8.805 12.7274 8.715 12.6899C8.625 12.6524 8.5425 12.5999 8.4675 12.5324C8.4 12.4574 8.3475 12.3824 8.31 12.2849C8.2725 12.1949 8.25 12.0974 8.25 11.9999C8.25 11.9024 8.2725 11.8049 8.31 11.7149C8.3475 11.6249 8.4 11.5424 8.4675 11.4674C8.5425 11.3999 8.625 11.3474 8.715 11.3099C8.895 11.2349 9.105 11.2349 9.285 11.3099C9.375 11.3474 9.4575 11.3999 9.5325 11.4674C9.6 11.5424 9.6525 11.6249 9.69 11.7149C9.7275 11.8049 9.75 11.9024 9.75 11.9999C9.75 12.0974 9.7275 12.1949 9.69 12.2849C9.6525 12.3824 9.6 12.4574 9.5325 12.5324C9.4575 12.5999 9.375 12.6524 9.285 12.6899C9.195 12.7274 9.0975 12.7499 9 12.7499Z"
						fill="#201C1A"
						fillOpacity="0.55"
					/>
				</g>
				<defs>
					<clipPath id="clip0_8327_12512">
						<rect width="18" height="18" fill="white" />
					</clipPath>
				</defs>
			</svg>

			<Tooltip
				open={isTooltipOpen}
				onClose={handleTooltipClose}
				title={
					<>
						<Typography
							fontSize="14px"
							color="#ffffff"
							lineHeight="14.4px"
							fontWeight={400}
							fontFamily="HankenGroteskRegular"
						>
							Each year program cost breakdown
						</Typography>
					</>
				}
			>
				<span />
			</Tooltip>
		</React.Fragment>
	);
};

export default ProgramCostTooltip;
