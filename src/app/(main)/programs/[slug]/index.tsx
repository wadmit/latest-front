"use client";

import ProgramsDetailContext from "@/context/program-detail-context";
import { ProgramDetails } from "@/page-components/programs/components";
import type { IProgram } from "@/types/program";
import { Box } from "@mui/material";
import React, { Suspense } from "react";

const index = ({ program }: { program: IProgram }) => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ProgramsDetailContext.Provider value={program}>
				<Box bgcolor="grey.A400">
					<ProgramDetails />
				</Box>
			</ProgramsDetailContext.Provider>
		</Suspense>
	);
};

export default index;
