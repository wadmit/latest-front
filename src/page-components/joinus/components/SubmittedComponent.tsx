"use client";

import { ButtonWrapper } from "@/components/common";
import { Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import SuccessJsonLoaderFile from "../../../../public/json/success-loader.json";
import React, { useEffect, useLayoutEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const SubmittedComponent = () => {
	const router = useRouter();

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			px={{ md: "3.125rem", xs: ".625rem" }}
			py="4.0625rem"
			width="100%"
			height="100%"
			color="grey.500"
		>
			<Typography variant="h4" textAlign="center">
				Your collaboration request has been successfully submitted.
			</Typography>

			<Stack
				direction="row"
				alignItems="center"
				justifyContent="center"
				mx="auto"
				height="25rem"
				width="100%"
				mt={-10}
			>
				<Lottie
					options={{ loop: false, animationData: SuccessJsonLoaderFile }}
				/>
			</Stack>

			<Typography
				variant="h4"
				textAlign="center"
				component="h4"
				color="grey.500"
				mb={2}
				mt={-10}
			>
				You are all set!
			</Typography>
			<Typography
				variant="subtitle2"
				textAlign="center"
				component="p"
				color="grey.500"
			>
				One of our representatives will contact you within 24-48 hours after
				assessing your documents!
				<br /> For more information email us at{" "}
				<Link href="mailto: info@wiseadmit.io">info@wiseadmit.io</Link>
			</Typography>
			<ButtonWrapper
				onClick={() => router.replace("/")}
				sx={{ maxWidth: "12.8125rem", width: "100%", mt: "2.6875rem" }}
			>
				ok
			</ButtonWrapper>
		</Stack>
	);
};

export default SubmittedComponent;
