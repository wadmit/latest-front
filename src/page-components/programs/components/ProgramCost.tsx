"use client";

import React, { useContext } from "react";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import ProgramsDetailContext from "@/context/program-detail-context";
import { ScholarShipRangeType } from "@/types/utils";
import type { TProgramCostProp } from "@/page-components/programs/utils/types";
import {
	calculateScholarship,
	getScholarshipInfo,
} from "@/common/utils/getScholarship";
import { ProgramCostTooltip } from "@/page-components/programs/components";

const ProgramCost = React.forwardRef(
	({ getConvertedCosts, isFoundation }: TProgramCostProp, ref) => {
		const searchParams = useSearchParams();
		const program = useContext(ProgramsDetailContext);

		const programType = program.type.name;

		const wiseScore = searchParams.get("wisescore") ?? 0;

		const hasWiseScore = !!wiseScore;

		const scholarshipRange: ScholarShipRangeType | null =
			program?.detail?.scholarshipRange ?? null;

		const averageTuitionFee = !hasWiseScore
			? `${
					getConvertedCosts(
						program.detail.fees.tution_fee,
						program?.detail?.base_currency,
					).formattedValue
				}`
			: (calculateScholarship({
					scholarShipRange: scholarshipRange!,
					tutionFee: program.detail.fees.tution_fee,
					wisescore: +wiseScore,
				}) ?? 0);

		const calculateYearlyCost = () => {
			const programDuration = program.detail.program_duration;
			const tuitionFee = program.detail.fees.tution_fee;
			const accommodationFee =
				program.university.detail.fees["On-Campus Acommodation/Year"];
			const livingCost = program.university.detail.fees["Cost of Living"];

			let firstYearCost = tuitionFee + accommodationFee + livingCost;
			if (hasWiseScore) {
				firstYearCost =
					calculateScholarship({
						scholarShipRange: scholarshipRange!,
						tutionFee: tuitionFee,
						wisescore: +wiseScore,
					}) ?? tuitionFee;
			}

			let overallCost;
			let secondYearCost;

			if (programType === "Bachelor Degree (4 years)") {
				const subsequentYearsCost = tuitionFee;
				if (programDuration === 6) {
					overallCost = (firstYearCost + subsequentYearsCost * 5) / 6;
				} else {
					overallCost = (firstYearCost + subsequentYearsCost * 3) / 4;
				}
			} else if (programType === "Master Degree (2.5 years)") {
				secondYearCost = tuitionFee;
				overallCost = (firstYearCost + secondYearCost) / 2;
			} else {
				overallCost = firstYearCost + accommodationFee + livingCost;
			}

			return overallCost;
		};

		const overallCost = calculateYearlyCost();

		return (
			<Box
				ref={ref}
				border="1px solid #E9E9E9"
				borderRadius="8px"
				id="costs"
				bgcolor="white"
				p={3}
				display="flex"
				flexDirection="column"
				gap="25px"
			>
				<Box display="flex" flexDirection="column" gap="22px">
					<Box>
						<Typography
							fontSize="24px"
							fontStyle="normal"
							fontFamily="HankenGroteskExtraBold"
							lineHeight="150%"
							letterSpacing="-0.48px"
							color="#201C1A"
						>
							Cost of{" "}
							{isFoundation
								? "program"
								: `studying at ${program?.university?.name}`}
						</Typography>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						gap="10px"
						bgcolor="rgba(245, 242, 212, 1)"
						justifyContent="center"
						alignItems="center"
						borderRadius="8px"
						padding="24px"
					>
						<Grid container gap="20px">
							<Grid
								item
								xs={12}
								sm={12}
								md={4}
								lg={isFoundation ? 2 : 5}
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<Box>
									<Typography
										fontSize="20px"
										fontFamily="HankenGroteskExtraBold"
										lineHeight="150%"
										letterSpacing="-0.4px"
										color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
									>
										{isFoundation ? "Course Fee" : "Average Tuition Fees"}
									</Typography>
									<Stack direction="column" gap={1}>
										<Typography
											fontSize="28px"
											fontFamily="HankenGroteskExtraBold"
											lineHeight="36.4px"
											letterSpacing="-3%"
											color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
										>
											{!hasWiseScore
												? `${
														getConvertedCosts(
															program.detail.fees.tution_fee,
															program?.detail?.base_currency,
														).formattedValue
													}`
												: getConvertedCosts(
														overallCost,
														program?.detail?.base_currency,
													).formattedValue}{" "}
											/year
										</Typography>
									</Stack>
								</Box>
							</Grid>
							<Grid item lg={6.5} md={8} sm={12} xs={12}>
								<Box mb={"24px"} display="flex" alignItems="center" gap="8px">
									<Typography
										fontSize="18px"
										fontFamily="HankenGroteskExtraBold"
										lineHeight="23.4px"
										letterSpacing="-0.2px"
										color="rgba(32, 28, 26, 0.95)"
									>
										Tuition fee cost breakdown
									</Typography>
									<ProgramCostTooltip />
								</Box>
								{/* Bachelor */}
								{programType === "Bachelor Degree (4 years)" && (
									<Box display="flex" flexDirection="column" gap="10px">
										{(program.detail.program_duration === 6
											? [
													"First year(apx)",
													"Second year(apx)",
													"Third year(apx)",
													"Fourth year(apx)",
													"Fifth year(apx)",
													"Sixth year(apx)",
												]
											: [
													"First year(apx)",
													"Second year(apx)",
													"Third year(apx)",
													"Fourth year(apx)",
												]
										).map((year, index) => (
											<React.Fragment key={index}>
												<Box display="flex" justifyContent="space-between">
													<Typography
														fontFamily="HankenGroteskBold"
														fontSize="14px"
														fontWeight={600}
														lineHeight="19.6px"
														color="rgba(32, 28, 26, 0.9)"
													>
														{year}
													</Typography>
													<Box display="flex" gap="8px">
														{index === 0 &&
															hasWiseScore &&
															getScholarshipInfo({
																scholarShipRange: scholarshipRange!,
																currency: program?.detail?.base_currency,
																wisescore: +wiseScore,
															}) && (
																<Typography
																	fontSize="14px"
																	fontFamily="HankenGroteskRegular"
																	lineHeight="19.6px"
																	letterSpacing="-0.56px"
																	color="#DB1920"
																	sx={{ textDecorationLine: "line-through" }}
																>
																	{
																		getConvertedCosts(
																			program?.detail?.fees?.tution_fee ?? 0,
																			program?.detail?.base_currency,
																		).formattedValue
																	}
																</Typography>
															)}
														<Typography
															fontFamily="HankenGroteskRegular"
															fontSize="14px"
															fontWeight={400}
															lineHeight="19.6px"
															color="rgba(32, 28, 26, 0.9)"
														>
															{index === 0 && hasWiseScore
																? getConvertedCosts(
																		+averageTuitionFee,
																		program?.detail?.base_currency,
																	).formattedValue
																: getConvertedCosts(
																		program?.detail?.fees?.tution_fee ?? 0,
																		program?.detail?.base_currency,
																	).formattedValue}
														</Typography>
													</Box>
												</Box>
												{index <
													(program.detail.program_duration === 6 ? 5 : 3) && (
													<Divider />
												)}
											</React.Fragment>
										))}
									</Box>
								)}
								{/* Master */}
								{programType === "Master Degree (2.5 years)" && (
									<Box display="flex" flexDirection="column" gap="10px">
										{["First year(apx)", "Second year(apx)"].map(
											(year, index) => (
												<React.Fragment key={index}>
													<Box display="flex" justifyContent="space-between">
														<Typography
															fontFamily="HankenGroteskBold"
															fontSize="14px"
															fontWeight={600}
															lineHeight="19.6px"
															color="rgba(32, 28, 26, 0.9)"
														>
															{year}
														</Typography>
														{index === 0 &&
															hasWiseScore &&
															getScholarshipInfo({
																scholarShipRange: scholarshipRange!,
																currency: program?.detail?.base_currency,
																wisescore: +wiseScore,
															}) && (
																<Typography
																	fontSize="14px"
																	fontFamily="HankenGroteskRegular"
																	lineHeight="19.6px"
																	letterSpacing="-0.56px"
																	color="#DB1920"
																	sx={{ textDecorationLine: "line-through" }}
																>
																	{
																		getConvertedCosts(
																			program?.detail?.fees?.tution_fee ?? 0,
																			program?.detail?.base_currency,
																		).formattedValue
																	}
																</Typography>
															)}
														<Typography
															fontFamily="HankenGroteskRegular"
															fontSize="14px"
															fontWeight={400}
															lineHeight="19.6px"
															color="rgba(32, 28, 26, 0.9)"
														>
															{index === 0 && hasWiseScore
																? getConvertedCosts(
																		+averageTuitionFee,
																		program?.detail?.base_currency,
																	).formattedValue
																: getConvertedCosts(
																		program?.detail?.fees?.tution_fee ?? 0,
																		program?.detail?.base_currency,
																	).formattedValue}
														</Typography>
													</Box>
													{index < 1 && <Divider />}
												</React.Fragment>
											),
										)}
									</Box>
								)}
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Divider />
				<Box>
					<Grid container justifyContent="space-between" spacing={3}>
						<Grid item xs={12} sm={12} md={12} lg={isFoundation ? 2 : 4.8}>
							<Box display="flex" flexDirection="column" gap="16px">
								<Typography
									fontSize="16px"
									fontStyle="normal"
									fontFamily="HankenGroteskSemiBold"
									lineHeight="160%"
									color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
								>
									Overall Cost
								</Typography>
								<Stack direction="column" gap={1}>
									<Typography
										fontSize="18px"
										fontStyle="normal"
										fontFamily="HankenGroteskExtraBold"
										lineHeight="150%"
										letterSpacing="-0.36px"
										color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
									>
										{!hasWiseScore
											? getConvertedCosts(
													(program?.detail?.fees?.tution_fee ?? 0) +
														program.university.detail.fees[
															"On-Campus Acommodation/Year"
														] +
														program.university.detail.fees["Cost of Living"],
													program?.detail?.base_currency,
												).formattedValue
											: getConvertedCosts(
													// (program?.detail?.fees?.tution_fee ?? 0) +
													+overallCost +
														program.university.detail.fees[
															"On-Campus Acommodation/Year"
														] +
														program.university.detail.fees["Cost of Living"],
													program?.detail?.base_currency,
												).formattedValue}{" "}
										/year
									</Typography>
								</Stack>
							</Box>
						</Grid>

						<Grid item xs={6} sm={6} md={6} lg={4}>
							<Box display="flex" flexDirection="column" gap="16px">
								<Typography
									fontSize="16px"
									fontStyle="normal"
									fontFamily="HankenGroteskSemiBold"
									lineHeight="160%"
									color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
								>
									On-Campus Accommodation
								</Typography>
								<Typography
									fontSize="18px"
									fontStyle="normal"
									fontFamily="HankenGroteskExtraBold"
									lineHeight="150%"
									letterSpacing="-0.36px"
									color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
								>
									{
										getConvertedCosts(
											isFoundation
												? program.university.detail.fees[
														"On-Campus Acommodation/Year"
													] / 2
												: program.university.detail.fees[
														"On-Campus Acommodation/Year"
													],
											program.detail?.base_currency,
										).formattedValue
									}{" "}
									&nbsp;/&nbsp;year
								</Typography>
							</Box>
						</Grid>

						<Grid item xs={6} sm={6} md={6} lg={isFoundation ? 2 : 3.2}>
							<Box display="flex" flexDirection="column" gap="16px">
								<Typography
									fontSize="16px"
									fontStyle="normal"
									fontFamily="HankenGroteskSemiBold"
									lineHeight="160%"
									color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
								>
									Cost of Living
								</Typography>
								<Typography
									fontSize="18px"
									fontStyle="normal"
									fontFamily="HankenGroteskExtraBold"
									lineHeight="150%"
									letterSpacing="-0.36px"
									color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
								>
									{
										getConvertedCosts(
											isFoundation
												? program.university.detail.fees["Cost of Living"] / 2
												: program.university.detail.fees["Cost of Living"],
											program.detail?.base_currency,
										).formattedValue
									}{" "}
									&nbsp;/&nbsp;year
								</Typography>
							</Box>
						</Grid>
						{isFoundation && (
							<Grid item xs={6} sm={6} md={6} lg={4}>
								<Box display="flex" flexDirection="column" gap="16px">
									<Typography
										fontSize="16px"
										fontStyle="normal"
										fontFamily="HankenGroteskSemiBold"
										lineHeight="160%"
										color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
									>
										Application Fee
									</Typography>
									<Typography
										fontSize="18px"
										fontStyle="normal"
										fontFamily="HankenGroteskExtraBold"
										lineHeight="150%"
										letterSpacing="-0.36px"
										color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
									>
										{
											getConvertedCosts(
												program.university.detail.fees["Application Fee"],
												program?.detail?.base_currency,
											).formattedValue
										}
									</Typography>
								</Box>
							</Grid>
						)}
					</Grid>
				</Box>
			</Box>
		);
	},
);

export default ProgramCost;
