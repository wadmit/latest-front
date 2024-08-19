"use client";
import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import FAQAccordionComp from "@/components/common/faq/FAQAccordionComp";
import type { IFAQData } from "@/page-components/faq/utils/types";
import {
	studentsQuestionsFAQPage,
	wiseadmitQuestionsFAQPage,
} from "@/page-components/faq/utils/provider";

const FaqBody = () => {
	const [activeMenu, setActiveMenu] = useState(0);
	const Menu = ["Wiseadmit", "Students"];

	const getComponent: IFAQData[] = useMemo(() => {
		switch (activeMenu) {
			case 0:
				return wiseadmitQuestionsFAQPage;
			case 1:
				return studentsQuestionsFAQPage;
			default:
				return wiseadmitQuestionsFAQPage;
		}
	}, [activeMenu]);
	return (
		<Box
			mb="112px"
			mt={{
				xs: "32px",
				sm: "32px",
				md: "48px",
				lg: "64px",
			}}
		>
			<Box gap="8px" alignItems="center" display="flex">
				{Menu.map((item, index) => (
					<Box
						borderRadius="60px"
						width="130px"
						height="42px"
						display="flex"
						justifyContent="center"
						alignItems="center"
						key={`${item}`}
						sx={{
							cursor: "pointer",
						}}
						border={`1px solid ${
							activeMenu === index
								? "rgba(255, 181, 132, 1)"
								: "rgba(0, 0, 0, 0.6)"
						}`}
						onClick={() => setActiveMenu(index)}
					>
						<Typography
							fontSize="16px"
							fontWeight={activeMenu === index ? 600 : 400}
							color={
								activeMenu === index
									? "rgba(255, 107, 38, 1)"
									: "rgba(32, 28, 26, 0.9)"
							}
							component="span"
						>
							{item}
						</Typography>
					</Box>
				))}
			</Box>
			<Box display="flex" flexDirection="column" gap="20px" mt="48px">
				{getComponent.map((faq, index) => (
					<FAQAccordionComp
						index={index}
						key={faq.title}
						title={faq.title}
						details={faq.details}
					/>
				))}
			</Box>
		</Box>
	);
};

export default FaqBody;
