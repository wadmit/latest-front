import { Typography } from "@mui/material";
import type { PasswordRequirementProps } from "@/page-components/apply-now/utils/types";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export function PasswordRequirement({
	valid,
	children,
}: PasswordRequirementProps) {
	return (
		<Typography
			fontFamily="HankenGroteskRegular"
			fontSize="14px"
			color="rgba(32, 28, 26, 0.9)"
			lineHeight="18.24px"
			style={{ display: "flex", alignItems: "center" }}
		>
			{valid ? (
				<CheckCircleIcon style={{ color: "green", marginRight: "5px" }} />
			) : (
				<CancelIcon style={{ color: "red", marginRight: "5px" }} />
			)}

			{children}
		</Typography>
	);
}
