"use client";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { setUserApplications } from "@/global-states/reducers/applicationReducer";
import { EApplicationStatus } from "@/types/application";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { allMonths } from "../utils/data";
import { useMutation } from "@tanstack/react-query";
import { removeApplication } from "@/api/web/application.action";
import {
	Box,
	Button,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { StyledTableCell } from "../utils/provider";
import { Chip } from "./Chip";

interface Column {
	id: string;
	label: string;
	minWidth?: number;
	align?: "right" | "left" | "center";
}
const columns: readonly Column[] = [
	{ id: "university", label: "University", minWidth: 130 },
	{ id: "program", label: "Program", minWidth: 110 },
	{ id: "start_date", label: "Start Date", minWidth: 110 },
	{
		id: "actions",
		label: "",
		minWidth: 110,
	},
];

interface IProps {
	status: boolean;
	filter: EApplicationStatus[];
}
function ApplicationPaidTable({ status, filter }: IProps) {
	// const [applications, setApplications] = useState<IApplication[]>([]);

	const userApplications = useAppSelector(
		(state) => state.applications.applications,
	);
	const dispatch = useAppDispatch();
	const { mutate, isPending, isError } = useMutation({
		mutationFn: removeApplication,
	});

	const router = useRouter();

	const getMonthAndYear = (date?: Date | number | string): string => {
		if (date) {
			const dateInReal = new Date(date);
			return `${allMonths[dateInReal.getMonth()]} ${dateInReal.getFullYear()}`;
		}
		return "N/A";
	};

	const removeApplicationFromStack = (id: string) => {
		if (!isPending) {
			mutate(id);
			if (!isError) {
				const newApplications = userApplications.filter(
					(application) => application.id !== id,
				);
				dispatch(setUserApplications({ data: newApplications }));
			}
		}
	};

	return (
		<Stack>
			{/* Displaying Table */}
			{userApplications.filter((a) => filter.includes(a.status)).length > 0 && (
				<TableContainer
					component={Paper}
					sx={{ overflowX: "auto", width: "100%", marginTop: "8px" }}
				>
					<Table sx={{ minWidth: "700px" }} aria-label="application table">
						<TableHead
							sx={{
								padding: "0px",
								border: "0px",
							}}
						>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										sortDirection={false}
										key={column.id}
										align={column.align}
										sx={{ paddingY: "4px", border: "0px" }}
										style={{
											minWidth: column.minWidth,
											background: "#FAFAFA",
										}}
									>
										<Typography
											variant="subtitle1_sb"
											fontSize="14px"
											color="#848484"
											fontFamily="HankenGroteskExtraBold"
										>
											{column.label}
										</Typography>
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{userApplications
								.filter((a) => filter.includes(a.status))
								.map((row, i) => (
									<TableRow role="checkbox" tabIndex={-1} key={row.id}>
										<StyledTableCell
											sx={{
												borderBottom:
													userApplications.length === i + 1
														? "0px "
														: "1px solid #EAEAEA",
											}}
											align="left"
										>
											<Typography
												variant="subtitle1_sb"
												fontSize="14px"
												color=""
												fontFamily="HankenGroteskExtraBold"
											>
												{row.university?.name}
											</Typography>
										</StyledTableCell>
										<StyledTableCell
											sx={{
												borderBottom:
													userApplications.length === i + 1
														? "0px "
														: "1px solid #EAEAEA",
											}}
											align="left"
										>
											<Typography
												variant="subtitle1_sb"
												fontSize="14px"
												color=""
												fontFamily="HankenGroteskExtraBold"
											>
												{row.program?.name} <br />{" "}
												{row?.foundation?.name ? (
													<Chip text="Foundation" />
												) : (
													""
												)}
											</Typography>
										</StyledTableCell>
										<StyledTableCell
											sx={{
												borderBottom:
													userApplications.length === i + 1
														? "0px "
														: "1px solid #EAEAEA",
											}}
											align="left"
										>
											<Typography
												variant="subtitle1_sb"
												fontSize="14px"
												color=""
												fontFamily="HankenGroteskExtraBold"
											>
												{getMonthAndYear(
													row?.foundation?.detail?.startDate ||
														row?.program?.detail?.startDate,
												)}
											</Typography>
										</StyledTableCell>
										<TableCell
											sx={{
												borderBottom:
													userApplications.length === i + 1
														? "0px "
														: "1px solid #EAEAEA",
											}}
										>
											<Stack
												sx={{
													justifyContent: "space-between",
													alignItems: "center",
													width: "100%",
													flexDirection: "row",
												}}
												gap={2}
											>
												<Button
													onClick={() =>
														router.push(`/dashboard/applications/${row.id}`)
													}
													sx={{
														color: "var(--primary-main, #e66022)",
														fontFamily: "HankenGroteskSemibold",
														fontSize: "14px",
														fontStyle: "normal",
														fontHeight: "400",
														lineHeight: "140%",
														cursor: "pointer",
														display: "flex",
														justifyContent: "center",
														alignItems: "center",
														padding: "7px 12px",
														width: "100px",
														height: "28px",
														border: "1px solid var(--primary-main, #e66022)",
														borderRadius: "4px",
														backgroundColor: "transparent",
													}}
												>
													View
												</Button>
												{!status && (
													<Button
														sx={{ backgroundColor: "transparent" }}
														onClick={() => removeApplicationFromStack(row.id)}
													>
														<img src="/Dashboard/delete.svg" alt="delete" />
													</Button>
												)}
											</Stack>
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<Box />
		</Stack>
	);
}

export default ApplicationPaidTable;
