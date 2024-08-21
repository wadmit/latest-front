import {
	Box,
	Checkbox,
	Stack,
	styled,
	TextField,
	Typography,
} from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { StyledCheckBoxProps } from "@/page-components/wisescore/utils/type";

export const BoxWrapper = styled(Box)`
	background-size: cover;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100vh;
	min-height: 100vh;
	width: 100vw;
	// background-image: url("/noise.svg");
`;

export const CustomTextField = styled(TextField)(({ theme }) => ({
	width: "100%",
	fontSize: "16px !important",
	"& > .MuiInputLabel-animated": {
		fontSize: "16px !important",
	},
	"& .MuiFilledInput-root": {
		height: "56px",
		borderRadius: "12px", // customize border-radius if needed
		backgroundColor: "transparent",
		border: "1px solid rgba(102, 102, 102, 0.35)",
		// change to your desired filled background color
		"&::after,&::before": {
			display: "none",
		},
		"&.Mui-focused": {
			backgroundColor: "transparent",
			border: "1px solid rgba(255, 107, 38, 1)", // remove bottom border when focused
		},
		"& .MuiInputLabel-animated": {
			fontSize: "16px !important",
			color: "rgba(102, 102, 102, 1)",
		},
		// "& input[type='text']": {
		//   fontSize: '16px',
		//   color: 'rgba(102, 102, 102, 1)',
		// },
	},
}));

export function errorMessageBox(message: string) {
	return (
		<Box border={1} borderRadius={1} borderColor="error.light" py={2} px={2}>
			<Stack direction="row" alignItems="center">
				<ReportProblemIcon color="error" />
				<Typography variant="body2" component="p" color="error.main" ml={1}>
					{message}
				</Typography>
			</Stack>
		</Box>
	);
}

export const ResponsiveBox = styled(Box)`
	min-height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	background-position: center;
	background-size: cover;
	padding: 0px 80px 0px 126px;
	@media (max-width: 959px) {
		padding: 0px 20px;
	}

	@media (max-width: 599px) {
		padding: 0px 15px;
	}

	@media (max-width: 399px) {
		padding: 0px 15px;
	}
`;

export const StyledCheckBox = styled(Checkbox)<StyledCheckBoxProps>(
	({ primaryColor }) => ({
		color: "rgba(173, 173, 173, 1)",
		padding: "0px",
		"&.Mui-checked": {
			color: primaryColor,
		},
	}),
);
