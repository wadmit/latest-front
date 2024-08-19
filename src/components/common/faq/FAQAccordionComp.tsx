"use client";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { MinusIcon, PlusIcon } from "$/svg";
import { BodyB2, HeadingH5 } from "@/components/styled-components/design";
import type { IFAQData } from "@/page-components/faq/utils/types";
import { Stack } from "@mui/material";

function FAQAccordionComp({ title, details, index }: IFAQData) {
	const [expanded, setExpanded] = useState(index === 0);

	const handleChange = () => {
		setExpanded((prevExpanded) => !prevExpanded);
	};
	return (
		<Accordion
			sx={{
				boxShadow: "none",
				left: "-10px",
				borderBottom: "1px solid #ccc",
				pb: "10px",
				"&.MuiAccordion-root:before": {
					display: "none",
				},
			}}
			expanded={expanded}
			onChange={handleChange}
		>
			<AccordionSummary
				expandIcon={expanded ? <MinusIcon /> : <PlusIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
				sx={{
					paddingLeft: { lg: " 0px", md: "0px", sm: "0px", xs: "16px" },
					// Add space between title and expand icon
					".MuiAccordionSummary-content": {
						paddingRight: "30px",
					},
				}}
			>
				<Stack direction="row" gap="30px" alignItems="center">
					<HeadingH5 sx={{ maxWidth: "400px" }}>{title}</HeadingH5>
				</Stack>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					paddingRight: { lg: " 120px", md: "120px", sm: "80px", xs: "80px" },
					paddingLeft: { lg: " 0px", md: "0px", sm: "0px", xs: "16px" },
				}}
			>
				<BodyB2>{details}</BodyB2>
			</AccordionDetails>
		</Accordion>
	);
}

export default FAQAccordionComp;
