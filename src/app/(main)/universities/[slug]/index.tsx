"use client";

import UniversityDetailContext from "@/context/university-detail-context";
import { UniversityDetails } from "@/page-components/universities/components";
import type { IUniversity } from "@/types/university";
import { Box } from "@mui/material";
import React, { Suspense } from "react";

const index = ({ university }: { university: IUniversity }) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UniversityDetailContext.Provider value={university}>
				<Box bgcolor="grey.A400">
					<UniversityDetails />
				</Box>
			</UniversityDetailContext.Provider>
		</Suspense>
	);
};

export default index;
