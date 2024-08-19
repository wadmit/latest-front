import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Checkbox,
	FormControlLabel,
	Stack,
	Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { IAccordion } from "@/page-components/programs/utils/types";

function FilterProgramUniversityAccordin({
	title,
	filterData,
	handleFilter,
	componentFor,
}: IAccordion) {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [checkPoints, setCheckPoints] = useState<Record<string, string[]>>({
		type: [],
		country: [],
	});

	const router = useRouter();
	const queryParams = new URLSearchParams();

	const handleCheckboxChange = (value: string, type: string) => {
		const tempCheckPoints = { ...checkPoints };

		const index = tempCheckPoints[type].indexOf(value);

		if (index !== -1) {
			tempCheckPoints[type] = tempCheckPoints[type].filter(
				(each) => each !== value,
			);
		} else {
			tempCheckPoints[type] = [...tempCheckPoints[type], value];
		}

		Object.entries(tempCheckPoints).forEach(([key, values]) => {
			values.forEach((value) => queryParams.append(key, value));
		});

		setCheckPoints(tempCheckPoints);

		if (searchParams.get("searchTerm") !== null) {
			queryParams.set("searchTerm", searchParams.get("searchTerm")!);
		}

		const udpatedUrl =
			componentFor === "program"
				? `/programs?${queryParams.toString()}`
				: `/universities?${queryParams.toString()}`;

		router.replace(udpatedUrl, {
			scroll: false,
		});
		handleFilter(queryParams);
	};

	useEffect(() => {
		const initialCheckPoints: Record<string, string[]> = {
			type: searchParams.getAll("type"),
			country: searchParams.getAll("country"),
		};
		setCheckPoints(initialCheckPoints);
	}, [pathname, searchParams]);

	return (
		<Accordion sx={{ boxShadow: "none" }} defaultExpanded>
			<AccordionSummary
				expandIcon={<KeyboardArrowDownIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Stack direction="row" gap="30px" alignItems="center">
					<Typography
						color="var(--text-day-heading, #201C1A)"
						fontSize="18px"
						fontStyle="normal"
						fontFamily="HankenGroteskSemiBold"
						lineHeight="150%"
					>
						{title}
					</Typography>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Stack direction="column" gap="10px">
					{filterData?.map((optionGroup, groupIndex) => (
						<div key={groupIndex}>
							<Typography
								fontSize="16px"
								fontStyle="normal"
								fontFamily="HankenGroteskSemiBold"
								lineHeight="160%"
								color="var(--text-day-heading, #201C1A)"
							>
								{optionGroup.name}
							</Typography>
							<ul>
								{optionGroup.options.map((option, index) => (
									<li key={index} style={{ listStyle: "none" }}>
										<FormControlLabel
											key={index}
											control={
												<Checkbox
													color="primary"
													checked={checkPoints[optionGroup.query].includes(
														option.id,
													)}
													onChange={() => {
														handleCheckboxChange(option.id, optionGroup.query);
													}}
												/>
											}
											label={
												<>
													<Typography
														fontSize="16px"
														fontStyle="normal"
														fontFamily="HankenGroteskRegular"
														lineHeight="160%"
														color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
													>
														{option.name}
													</Typography>
												</>
											}
										/>
									</li>
								))}
							</ul>
						</div>
					))}
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}

export default FilterProgramUniversityAccordin;
