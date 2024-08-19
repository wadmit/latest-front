"use client";
import React, { useRef, useState } from "react";
import ProgramsSubCard from "./ProgramsSubCard";
import { theme } from "@/common/muicustomtheme/theme";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ButtonWrapper } from "@/components/common";
import { AddIcon } from "$/svg";
import { Remove } from "@mui/icons-material";

const matchArray = ["Excellent Match!", "Good Match", "Fair Match!"];

const containerPaperStyle = {
	p: 3,
	[theme.breakpoints.down("md")]: {
		p: 0,
	},
	my: 2,
	borderRadius: ".16px",
	position: "relative",
	maxWidth: "85rem",
	mx: "auto",
	// boxShadow: '-1px 0px 20px 0px rgba(13, 24, 41, 0.08)',
	// [theme.breakpoints.down('sm')]: {
	//   boxShadow: '0px',
	// },
	// [theme.breakpoints.down('xs')]: {
	//   boxShadow: '0px',
	// },
};

const matchRate = (rank: number) => {
	if (rank < 3) {
		if (rank === 0) {
			return (
				<Box bgcolor="#FFCE4F" borderRadius={1} px={1.5} py={0.5}>
					<Typography variant="subtitle1_sb">{matchArray[0]}</Typography>
				</Box>
			);
		}
		if (rank === 1) {
			return (
				<Box bgcolor="#FFF387" borderRadius={1} px={1.5} py={0.5}>
					<Typography variant="subtitle1_sb">{matchArray[1]}</Typography>
				</Box>
			);
		}
		return (
			<Box bgcolor="#FFF387" borderRadius={1} px={1.5} py={0.5}>
				<Typography variant="subtitle1_sb">{matchArray[2]}</Typography>
			</Box>
		);
	}
};

interface IUniversityData {
	// universities: TUniversities;
	university: any;
	rank: any;
	wisescore: any;
	getConvertedCosts: (
		value: number,
		base_currency: string,
	) => {
		formattedValue: string;
		amount: number;
	};
	// getConvertedCost: {
	//   getConvertedCosts: (value: number, curr?: string) => Promise<string>,
	//   baseCurrency: string
	// };
}

export function Card({
	university,
	rank,
	wisescore,
	getConvertedCosts,
}: IUniversityData) {
	const [maxLimit, setMaxLimit] = useState(2);
	const programsLength = university?.programs.length;
	const ref = useRef<any>(null);

	// const getConvertedCosts = useCostConverter();


	return (
		<Box
			bgcolor={{ lg: "#ffffff", md: "#ffffff", xs: "transparent" }}
			boxShadow={{ lg: "-1px 0px 20px 0px rgba(13, 24, 41, 0.08)", xs: "0px" }}
			sx={containerPaperStyle}
			ref={ref}
			// elevation={{ lg: 1, md: 1, xs: 0 }}
		>
			<Stack direction={{ md: "row", xs: "column" }} columnGap={3}>
				<Box
					position="relative"
					height={{ md: "17.75rem", xs: "11.0625rem", lg: "245px" }}
					maxWidth={{ md: "17.875rem", lg: "324px", xs: "100%" }}
					width="100%"
				>
					<Image
						alt="university-cover"
						src={
							university?.cover
								? `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${university.cover_key}`
								: "/images/universities/uni_1.png"
						}
						objectFit="cover"
						style={{
							borderRadius: "8px",
						}}
						layout="fill"
					/>
					<Box sx={{ position: "absolute", top: ".75rem", left: "1rem" }}>
						{matchRate(rank)}
					</Box>
				</Box>
				<Stack
					minHeight={{ md: "17.75rem", xs: "6.5rem" }}
					height="100%"
					boxSizing="border-box"
					direction="column"
					justifyContent="start"
					width="100%"
					padding="10px"
				>
					<Box>
						<Typography
							fontFamily="HankenGroteskExtraBold"
							fontSize={{ lg: "28px", md: "28px", sm: "20px", xs: "20px" }}
						>
							{university?.name}
						</Typography>
						<Typography
							variant="subtitle1"
							fontFamily="HankenGroteskRegular"
							color="#201C1A8C"
						>
							{university?.location} | Application Fee:{" "}
							{
								getConvertedCosts(
									university?.detail?.fees["Application Fee"],
									university?.base_currency,
								).formattedValue
							}
						</Typography>
					</Box>
					<Stack mt="22px">
						<Typography
							fontSize={{ lg: "16px", md: "16px", sm: "18px", xs: "18px" }}
							textAlign={{ lg: "left", md: "left", xs: "left" }}
							fontFamily="HankenGroteskBold"
						>
							Programs
						</Typography>
					</Stack>
					<Stack
						mt="18px"
						direction="column"
						rowGap={2}
						bgcolor={{
							lg: "#ffffff",
							md: "#ffffff",
							xs: "rgba(252, 250, 248, 1)",
						}}
						boxShadow={{
							lg: "-1px 0px 20px 0px rgba(13, 24, 41, 0.08)",
							xs: "-1px 0px 20px 0px rgba(13, 24, 41, 0.08)",
						}}
						padding="10px"
					>
						{university?.programs
							?.slice(0, maxLimit)
							.map((item: any) => (
								<ProgramsSubCard
									wisescore={wisescore}
									program={item}
									univerisity={university}
									getConvertedCosts={getConvertedCosts}
								/>
							))}
					</Stack>
				</Stack>
			</Stack>

			{programsLength > 2 && (
				<Stack
					justifyContent={{
						lg: "flex-end",
						md: "flex-end",
						sm: "center",
						xs: "center",
					}}
					direction="row"
					mt={1.7}
				>
					<Box maxWidth="11.6875rem" mt="32px" mb="32px">
						<ButtonWrapper
							startIcon={maxLimit === 2 ? <AddIcon /> : <Remove />}
							variant="text"
							onClick={() =>
								setMaxLimit((prev) => {
									if (prev === 2) {
										return programsLength;
									}
									return 2;
								})
							}
							sx={{
								textTransform: "none",
							}}
						>
							{maxLimit === 2 ? "See more programs" : "View Less"}
						</ButtonWrapper>
					</Box>
				</Stack>
			)}
		</Box>
	);
}
