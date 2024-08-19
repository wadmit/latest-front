"use client";
import {
	CustomListBlue,
	CustomListLarge,
	HeadingH1,
	RootContainer,
	SingleSection,
} from "@/components/common";
import { pages } from "@/constants/sitemaplinks";
import {
	Box,
	Grid,
	Stack,
	Theme,
	Typography,
	useMediaQuery,
} from "@mui/material";
import React from "react";

const SitemapHome = () => {
	const lessThanMd = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md"),
	);
	return (
		<RootContainer mt={5} mb={15}>
			<Stack direction="row" justifyContent="center">
				<Box width={{ md: "978px", sm: "641px", xs: "343px" }} gap={2}>
					<SingleSection>
						<HeadingH1>Sitemap for WiseAdmit</HeadingH1>
						<Typography
							fontSize="16px !important"
							fontWeight={400}
							color="rgba(0, 0, 0, 1)"
							lineHeight="22.4px"
							fontFamily="HankenGroteskRegular"
						>
							These are all the pages on our site
						</Typography>
					</SingleSection>
					<SingleSection>
						<CustomListLarge
							component="ol"
							style={{
								padding: "0px 0px 0px 22px",
							}}
						>
							<Grid container spacing={2}>
								<Grid lg={6} md={6} sm={6} xs={12} item>
									{/* Rendering items up to index 4 */}
									{pages.slice(0, lessThanMd ? 6 : 5).map((page, idx) => (
										<li key={idx}>
											<a target="_blank" href={page.path} rel="noreferrer">
												{page.title}
											</a>
											{page.children && (
												<SingleSection>
													<CustomListBlue
														component="ul"
														style={{
															listStyle: "square",
															padding: "0px 0px 0px 0px",
															margin: "0px",
															marginTop: "16px",
														}}
													>
														{page.children.map((child, childIdx) => (
															<li
																key={`${childIdx + child.title}`}
																className="sitemap_link"
															>
																<a
																	target="_blank"
																	href={child.path}
																	rel="noreferrer"
																>
																	{child.title}
																</a>
															</li>
														))}
													</CustomListBlue>
												</SingleSection>
											)}
										</li>
									))}
								</Grid>
								{/* Rendering items from index 5 onwards */}
								<Grid lg={6} md={6} sm={6} xs={12} item>
									{pages.slice(lessThanMd ? 6 : 5).map((page, idx) => (
										<li key={idx}>
											<a target="_blank" href={page.path} rel="noreferrer">
												{page.title}
											</a>
											{page.children && (
												<SingleSection>
													<CustomListBlue
														component="ul"
														style={{
															listStyle: "square",
															padding: "0px 0px 0px 0px",
															margin: "0px",
															marginTop: "16px",
														}}
													>
														{page.children.map((child, childIdx) => (
															<li
																key={`${childIdx + child.title}`}
																className="sitemap_link"
															>
																<a
																	target="_blank"
																	href={child.path}
																	rel="noreferrer"
																>
																	{child.title}
																</a>
															</li>
														))}
													</CustomListBlue>
												</SingleSection>
											)}
										</li>
									))}
								</Grid>
							</Grid>
						</CustomListLarge>
					</SingleSection>
				</Box>
			</Stack>
		</RootContainer>
	);
};

export default SitemapHome;
