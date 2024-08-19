"use client";
import React from "react";
import { Box, Input, useMediaQuery } from "@mui/material";
import type { IBlogNavMenuProps } from "@/page-components/blog/utils/types";
import { GetSearchIcon } from "@/page-components/blog/svg";

function BlogNavMenu({ handleSearch }: IBlogNavMenuProps) {
	return (
		<Box
			mt={2}
			display="flex"
			justifyContent="flex-end"
			gap={2}
			alignItems={{
				xs: "flex-start",
				sm: "flex-start",
				md: "center",
				lg: "center",
			}}
			flexDirection={{
				xs: "column-reverse",
				sm: "column-reverse",
				md: "row",
				lg: "row",
			}}
		>
			<Box
				display="flex"
				alignItems="center"
				width="100%"
				flex={{ xs: 1, sm: 1, md: 0.4, lg: 0.4 }}
			>
				<Input
					onChange={(e) => handleSearch(e.target.value)}
					sx={{
						outline: "none",
						"&::after": {
							content: '""',
							borderBottom: "none",
						},
						"&::before": {
							content: '""',
							borderBottom: "none !important",
						},
						borderRadius: "45px",
						border: "1px solid var(--bg-black-20, rgba(0, 0, 0, 0.20))",
						width: "100%",
						height: "40px",
						padding: "8px 48px 8px 24px",
					}}
					placeholder="Search For Blogs"
					startAdornment={
						<Box mt={0.5} mr={1}>
							<GetSearchIcon />
						</Box>
					}
				/>
			</Box>
		</Box>
	);
}

export default BlogNavMenu;
