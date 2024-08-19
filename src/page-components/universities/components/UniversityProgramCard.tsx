import React from "react";
import { Divider, Grid, Typography, Box } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/navigation";
import {
	GetCalender,
	GetDegree,
	TutionFee,
	GetDuration,
} from "@/page-components/universities/svg";
import type { IUniversityProgramCardProps } from "@/page-components/universities/utils/types";

function UniversityProgramCard({
	program,
	getConvertedCosts,
}: IUniversityProgramCardProps) {
	const duration = program.type.name.match(/\b(\d+(?:\.\d+)?)\b/);
	const programName = program.type.name.match(/^([^()]+)\s*\(/);

	const router = useRouter();
	return (
		<Box
			onClick={() => router.push(`/programs/${program.slug}`)}
			borderRadius="4px"
			border="1px solid var(--Scrim-Overlay, #E9E9E9)"
			bgcolor="#FFF"
			mt="24px"
			sx={{
				cursor: "pointer",
				transition: "all .2s ease",
				"&:hover": {
					transform: "scale(1.02)",
				},
			}}
			padding="20px"
		>
			<Box mb="12px" display="flex" flexDirection="column">
				<Typography
					fontSize="18px"
					fontFamily="HankenGroteskSemiBold"
					color="rgba(32, 28, 26, 0.95)"
				>
					{program.name}
				</Typography>
				<Typography
					color="rgba(32, 28, 26, 0.55)"
					fontSize="14px"
					fontFamily="HankenGroteskSemiBold"
				>
					{program?.discipline.name}
				</Typography>
			</Box>
			<Divider />
			<Grid rowGap="20px" mt="18px" container>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<Box display="flex" alignItems="center" gap="16px">
						<GetCalender />
						<Box display="flex" flexDirection="column">
							<Typography
								fontSize="14px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
								color="rgba(32, 28, 26, 0.55)"
							>
								Application Deadline
							</Typography>
							<Typography
								fontSize="16px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
							>
								{moment(program?.detail?.general_application_deadline1).format(
									"DD/MM/yyyy",
								)}
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<Box display="flex" alignItems="center" gap="16px">
						<GetDegree />
						<Box display="flex" flexDirection="column">
							<Typography
								fontSize="14px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
								color="rgba(32, 28, 26, 0.55)"
							>
								Degree
							</Typography>
							<Typography
								fontSize="16px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
							>
								{programName ? programName[1] : program?.type?.name}
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<Box display="flex" alignItems="center" gap="16px">
						<GetDuration />
						<Box display="flex" flexDirection="column">
							<Typography
								fontSize="14px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
								color="rgba(32, 28, 26, 0.55)"
							>
								Duration
							</Typography>
							<Typography
								fontSize="16px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
							>
								{program?.detail?.program_duration
									? `${program.detail.program_duration} yrs`
									: "N/A"}
								{/* {duration ? `${parseFloat(duration[1])} years` : 'NA'} */}
							</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<Box display="flex" alignItems="center" gap="16px">
						<TutionFee />
						<Box display="flex" flexDirection="column">
							<Typography
								fontSize="14px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
								color="rgba(32, 28, 26, 0.55)"
							>
								Tution Fee
							</Typography>
							<Typography
								fontSize="16px"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
							>
								{/* {program.detail.base_currency} */}
								{
									getConvertedCosts(
										program?.detail?.fees.tution_fee,
										program.detail.base_currency,
									).formattedValue
								}{" "}
								/yr
							</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}

export default UniversityProgramCard;
