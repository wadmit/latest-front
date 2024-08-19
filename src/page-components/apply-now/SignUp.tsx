"use client";

import { Box } from "@mui/material";
import React from "react";
import NavbarSignInUp from "@/page-components/apply-now/components/NavbarSignInUp";
import { ResponsiveBox } from "@/page-components/apply-now/utils/provider";
import Image from "next/image";
import Rainbow from "$/images/auth/rainbow.png";
import Flower from "$/images/auth/big_flower.png";
import Star from "$/images/auth/star.png";
import Desc from "$/images/auth/DescThree.svg";
import YellowStar from "$/images/auth/YellowStar.png";
import { SmallFlower } from "@/page-components/apply-now/svg";
import SignUpForm from "@/page-components/apply-now/components/SignUpForm";

function SignUp({
	handleLoginPages,
}: {
	handleLoginPages: (state: boolean) => void;
}) {
	return (
		<>
			<NavbarSignInUp />
			<ResponsiveBox
				// display="flex"
				justifyContent="space-between"
				alignItems={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
				flexDirection={{
					lg: "row",
					md: "row",
					sm: "column",
					xs: "column",
				}}
				padding={{
					lg: " 0px 0px 0px 126px",
					md: "0px 0px 0px 126px",
					sm: "0px 15px",
					xs: "0px 15px",
				}}
				overflow="clip"
				gap="100px"

				// justifyContent={{ lg: "center", md: "center", sm: "flex-start", xs: "flex-start" }}
				// alignItems={{ lg: "center", md: "center", sm: "flex-start", xs: "flex-start" }}
			>
				<SignUpForm handleLoginPages={handleLoginPages} />

				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="100%"
					width="100%"
					flex={0.6}
					// bgcolor="rgba(210, 50, 14, 0.5)"
				>
					<Box
						// position="relative"
						height={{
							lg: "85%",
							md: "85%",
							sm: "90%",
							xs: "90%",
						}}
						width={{
							lg: "85%",
							md: "85%",
							sm: "100%",
							xs: "100%",
						}}
						// sx={{ overflow: "clip" }}
						position="relative"
					>
						{/* <Box position="relative"> */}
						<img
							alt="WiseAdmit Login"
							loading="lazy"
							src="/images/auth/signupfour.png"
							width="100%"
							height="100%"
							// style={{
							//   objectFit: 'cover',
							//   borderRadius: '12px',
							//   aspectRatio: '13/8',
							//   // minWidth: '590px',
							// }}
						/>
						<Box position="absolute" top="0%" left="-30px">
							<Image alt="WiseAdmit Login" src={Star} />
						</Box>
						<Box position="absolute" top="2%" left="10px">
							<Image alt="WiseAdmit Login" src={Star} />
						</Box>
						<Box
							position="absolute"
							top="0%"
							right={{ lg: "-20px", md: "-20px", sm: "0px", xs: "0px" }}
						>
							<SmallFlower />
						</Box>
						<Box
							position="absolute"
							top="2%"
							right={{ lg: "-50px", md: "-20px", sm: "-10px", xs: "-10px" }}
						>
							<Image alt="WiseAdmit Login" src={Rainbow} />
						</Box>

						<Box position="absolute" bottom="7%" right="10px">
							<Image alt="WiseAdmit Login" src={Star} />
						</Box>

						<Box position="absolute" bottom="0%" left="-25px">
							<Image alt="WiseAdmit Login" src={Star} />
						</Box>

						<Box position="absolute" bottom="2%" right="10px">
							<Image alt="WiseAdmit Login" src={YellowStar} />
						</Box>

						<Box
							position="absolute"
							bottom="0%"
							right={{ lg: "-25px", md: "-20px", sm: "0px", xs: "0px" }}
						>
							<Image alt="WiseAdmit Login" src={Flower} />
						</Box>
						<Box
							position="absolute"
							bottom={{ xl: "0%", lg: "10%", md: "30%", sm: "10%", xs: "10%" }}
							left={{ xl: "10%", lg: "10%", md: "20%", sm: "8%", xs: "8%" }}
						>
							<Image alt="WiseAdmit Login" src={Desc} />
						</Box>
						{/* </Box> */}
						{/* <img
              alt="WiseAdmit Login"
              loading="lazy"
              src="/Programs/signin.png"
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
                aspectRatio: '13/8',
                // minWidth: '590px',
              }}
            /> */}
					</Box>
				</Box>

				{/* <Grid container spacing={{ lg: "79px", md: "120px", sm: "50px", xs: "30px" }} gap={"79px"}>
          <Grid item lg={6} md={6} sm={12} xs={12} >
            <Box display="flex" flexDirection="column" gap="18px" justifyContent="center" >
              <Box display="flex" flexDirection="column" gap="40px">
                <Box
                  onClick={() => router.push("/")}
                  sx={{
                    cursor: "pointer"
                  }}>
                  <WiseAdmitColorFulSvg />
                </Box>
                <Typography fontFamily="HankenGroteskExtraBold" fontSize={{ lg: "28px", md: "28px", sm: "20px", xs: "30px" }} lineHeight="42px">Create an account to WiseAdmit</Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  component="p"
                // textAlign="center"
                >
                  Already an account?
                  <Link
                    color="primary"
                    underline="hover"
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography
                      variant="inherit"
                      color="primary"
                      component="span"
                      onClick={() => handleLoginPages(true)}
                      role="presentation"
                      style={{ textDecoration: "underline" }}
                    >
                      {' '}
                      Login
                    </Typography>
                  </Link>
                </Typography>
              </Box>
              <Box>
                <SignUpForm />
              </Box>
            </Box>
          </Grid>

          <Grid item lg={5} md={5} sm={12} xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
            <Image src={Star} style={{ top: "0px" }} />
            <Box maxWidth="100%" >
              <Box position="relative" sx={{ overflow: "clip" }}>
                <Image src={signupbg} />
                <Box position="absolute" zIndex={1000111} top={{ lg: 400, md: 100, sm: 300, xs: 100 }} right={{ lg: 200, md: 100, sm: 200, xs: 100 }}>
                  <Image src={Desc} />
                </Box>
              </Box>
            </Box> */}
				{/* <Box> */}
				{/* <Image src={Rainbow} /> */}
				{/* </Box> */}
				{/* </Grid> */}
				{/* </Grid> */}
			</ResponsiveBox>
		</>
	);
}

export default SignUp;
