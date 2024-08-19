"use client";
import { useEffect } from "react";
import {
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from "react-share";
import { Box, Stack, Typography } from "@mui/material";
import type { IBlog } from "@/types/blog";

export function SingleBlogHeader({ blog }: { blog: IBlog }) {
	const pitch = 5;
	const rate = 5;
	const volume = 10;
	const lang = "en-US";
	const linkToShare = `https://wiseadmit.io/blogs/${blog?.slug}`;
	function newSpeech(text: string) {
		// below is the method to speak:
		// window.speechSynthesis.speak(new window.speechSynthesisUtterance(text to be spoken))
		const utterance = new window.SpeechSynthesisUtterance(
			text?.replace(/\s/g, " "),
		);
		utterance.pitch = pitch / 5;
		utterance.rate = 0.7;
		utterance.volume = 0.2;
		utterance.lang = lang;
		window.speechSynthesis.speak(utterance);
	}

	function speech(text: string) {
		if (!window.speechSynthesis)
			return alert("Browser not supported! Try some other browser");
		// window.speechSynthesis is an API which enables to convert text into speech
		if (!window.speechSynthesis.speaking) return newSpeech(text); // window.speechSynthesis.speaking checks it window.speechSynthesis is speaking or not
		window.speechSynthesis.cancel();
	}

	useEffect(() => {
		window.speechSynthesis?.cancel();
	}, []);

	const textToSppech = (text: string) => {
		const synth = window.speechSynthesis;
		const voices = synth.getVoices();
		// const msg = new SpeechSynthesisUtterance(text);
		// window.speechSynthesis.speak(msg);
	};

	const extractAndReadText = () => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(blog?.desc, "text/html");
		const text = doc.body.textContent || "";
		speech(text);
	};

	return (
		<Stack mt={6}>
			{/* <Button onClick={extractAndReadText}>Read</Button> */}
			<Typography variant="h3" component="h1">
				{blog?.title}
			</Typography>
			<Stack
				direction="row"
				mt=".9375rem"
				alignItems="center"
				columnGap=".5rem"
				justifyContent="space-between"
				flexWrap="wrap"
				width="100%"
			>
				<Stack
					justifyContent="space-between"
					direction="row"
					alignItems="center"
				>
					<Typography mt={1} fontSize="16px" variant="body2" color="#201C1A8C">
						{blog?.readTime} min read | Written by WiseAdmit
						{/* {' '}{new Date(blog?.createdAt).toDateString()} */}
					</Typography>
				</Stack>

				<Box display="flex" gap={2}>
					<FacebookShareButton url={linkToShare} hashtag="#wiseadmit">
						<FacebookIcon size={32} round />
					</FacebookShareButton>
					<WhatsappShareButton title={blog?.title} url={linkToShare}>
						<WhatsappIcon size={32} round />
					</WhatsappShareButton>
					<LinkedinShareButton
						url={linkToShare}
						title={blog?.title}
						summary={blog?.meta}
						source="https://wiseadmit.io"
					>
						<LinkedinIcon size={32} round />
					</LinkedinShareButton>
				</Box>
			</Stack>
		</Stack>
	);
}
