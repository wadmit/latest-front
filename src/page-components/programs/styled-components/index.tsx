import { Box, styled, Tabs } from "@mui/material";
import { TableCell, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: "#445E81 !important",
		color: "#fffff !important",
		border: 0,
	},
	[`&.${tableCellClasses.body}`]: {
		backgroundColor: "#EAF3FF",
	},
}));
