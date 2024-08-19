"use client";
import {
	Box,
	Button,
	Grid,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

const Photos = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const data = [
		{
			name: "Dr. Rupesh Regmi",
			position: "Co-Founder & CEO",
			imgSrc: "/images/about/RupeshRegmi.png",
			linkedInUrl: "https://www.linkedin.com/in/r4regmi/",
		},
		{
			name: "Sudip Thapa",
			position: "Co-Founder & CTO",
			imgSrc: "/images/about/SudipThapa.png",
			linkedInUrl: "https://www.linkedin.com/in/sudipthapa/",
		},
		{
			name: "Pan Cuicui",
			position: "Co-Founder",
			imgSrc: "/images/about/Cui.png",
			linkedInUrl: "https://www.linkedin.com/company/wise-admit/mycompany/",
		},
		{
			name: "Gerald Ochieng Ndede",
			position: "Country Manager, Kenya",
			imgSrc: "/images/about/Gerald.png",
			linkedInUrl: "https://www.linkedin.com/in/gerald-ndede/",
		},
		{
			name: "Christian Ilunga",
			position: "Country Manager, DR Congo",
			imgSrc: "/images/about/Christian.png",
			linkedInUrl: "https://www.linkedin.com/in/dr-christian-ilunga-6553b79b/",
		},
		{
			name: "Rupak Thapa Magar",
			position: "Founding Engineer",
			imgSrc: "/images/about/Rupak.png",
			linkedInUrl: "https://www.linkedin.com/in/rupaak/",
		},
		{
			name: "Subham Mishra",
			position: "Founding Engineer",
			imgSrc: "/images/about/Subham.png",
			linkedInUrl: "https://www.linkedin.com/in/subham-mishra-664b88217/",
		},
		{
			name: "Celina Pokharel",
			position: "Product Designer",
			imgSrc: "/images/about/Celina.png",
			linkedInUrl: "https://www.linkedin.com/in/selina-pk/",
		},
		{
			name: "Jeevan Ale Magar",
			position: "QA Engineer",
			imgSrc: "/images/about/Jeevan.png",
			linkedInUrl: "https://www.linkedin.com/in/jeevan-ale-175220221/",
		},
		{
			name: "Sanju Dongol",
			position: "Growth Manager",
			imgSrc: "/images/about/Sanju.png",
			linkedInUrl: "https://www.linkedin.com/in/sanjudongol/",
		},
		{
			name: "Priyanshu Kharel",
			position: "Software Engineer",
			imgSrc: "/images/about/Priyanshu.png",
			linkedInUrl: "https://www.linkedin.com/in/priyanshu-kharel-22a09b23a/",
		},
		{
			name: "Ayush Niroula",
			position: "Software Engineer",
			imgSrc: "/images/about/Ayush.png",
			linkedInUrl: "https://www.linkedin.com/in/ayush-niroula-431a891a5/",
		},
		{
			name: "Ankit Chitrakar",
			position: "Graphics Designer",
			imgSrc: "/images/about/Ankit.png",
			linkedInUrl: "https://www.linkedin.com/in/ankit-chitrakar-b6b836259/",
		},
		// { name: "Rumisha Pandey", position: "Student Outreach", imgSrc: "/about/Rumisha.png", linkedInUrl: "https://www.linkedin.com/in/rumisha-pandey-562196211/" },
		// { name: "Pujan Paudel", position: "Junior Admission Advisor", imgSrc: "/about/Pujan.png", linkedInUrl: "https://www.linkedin.com/in/pujan-paudel-098914299/" },
	];

	const handleLinkedInClick = (url: string) => {
		window.open(url, "_blank");
		// window.location.href = url;
	};
	return (
		<Grid
			container
			spacing={{ lg: "48px", md: "48px", sm: "20px", xs: "16px" }}
		>
			{data.map((item, index) => (
				<Grid item lg={3} md={3} sm={4} xs={6} key={index}>
					<Box display="flex" flexDirection="column">
						<Box
							position="relative"
							mb="20px"
							onClick={
								isMobile
									? () => handleLinkedInClick(item.linkedInUrl)
									: undefined
							}
						>
							<Image
								src={item.imgSrc}
								height={isMobile ? 170 : 280}
								width={isMobile ? 170 : 280}
								alt="photo"
							/>
							<Box
								position="absolute"
								zIndex={10}
								bottom={{ lg: "20px", md: "20px", sm: "20px", xs: "10px" }}
								right={{ lg: "6px", md: "6px", sm: "6px", xs: "-2px" }}
								// display={isMobile ? "none" : "flex"}
							>
								<Button
									sx={{
										height: "24px",
										width: "24px",
										background: "transparent",
										"&:hover": {
											backgroundColor: "transparent",
											// color: "orange"
										},
									}}
									onClick={() => handleLinkedInClick(item.linkedInUrl)}
								>
									<LinkedInButton isMobile={isMobile} />
								</Button>
							</Box>
						</Box>
						<Typography
							fontWeight={800}
							fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
							lineHeight={{
								lg: "26px",
								md: "26px",
								sm: "23.4px",
								xs: "23.4px",
							}}
							letterSpacing="-2%"
							color="rgba(32, 28, 26, 1)"
							sx={{ cursor: "pointer" }}
							onClick={() => handleLinkedInClick(item.linkedInUrl)}
							mb="4px"
						>
							{item.name}
						</Typography>
						<Typography
							fontWeight={400}
							fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
							lineHeight={{
								lg: "20.8px",
								md: "20.8px",
								sm: "18.2px",
								xs: "18.2px",
							}}
							color="rgba(0, 0, 0, 0.6)"
						>
							{item.position}
						</Typography>
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

interface ILinkedInButton {
	isMobile: boolean;
}

function LinkedInButton({ isMobile }: ILinkedInButton) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Box
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isHovered ? (
				<Image
					src="/images/about/linkedinhover.svg"
					height={isMobile ? 20 : 26}
					width={isMobile ? 20 : 26}
					alt="hoverlinkedin"
				/>
			) : (
				<Image
					src="/images/about/linkedinnormal.svg"
					height={isMobile ? 20 : 26}
					width={isMobile ? 20 : 26}
					alt="linkedin"
				/>
			)}
		</Box>
	);
}

export default Photos;
