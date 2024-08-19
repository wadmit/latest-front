import {
	BodyB2,
	BodyB2Bold,
	BodyB3,
	CustomList,
	CustomListBigGap,
	HeadingH1,
	HeadingH4,
	LastUpdatedChip,
	ParagraphCombination,
	RootContainer,
	SingleSection,
} from "@/components/common";
import { Box, Stack } from "@mui/material";
import React from "react";

const PrivacyPolicyHome = () => {
	return (
		<RootContainer mt={5} mb={15}>
			<Stack direction="row" justifyContent="center">
				<Box width={{ md: "779px", sm: "506px", xs: "343px" }} gap={2}>
					<LastUpdatedChip>
						<BodyB3>Last updated: April 3, 2024</BodyB3>
					</LastUpdatedChip>
					<SingleSection>
						<HeadingH1>Privacy Policy</HeadingH1>
						<ParagraphCombination>
							<BodyB2>
								At wiseadmit.io, accessible from wiseadmit.io, one of our main
								priorities is the privacy of our visitors. This privacy policy
								document contains types of information that is collected and
								recorded by wiseadmit.io and how we use it. If you have
								additional questions or require more information about our
								privacy policy, do not hesitate to contact us.
							</BodyB2>
						</ParagraphCombination>
					</SingleSection>
					<SingleSection>
						<HeadingH4>Consent</HeadingH4>
						<ParagraphCombination>
							<BodyB2>
								By using our website, you hereby consent to our Privacy Policy
								and agree to its terms. Information we collect. The personal
								information that you are asked to provide, and the reasons why
								you are asked to provide it, will be made clear to you at the
								point we ask you to provide your personal information. If you
								contact us directly, we may receive additional information about
								you such as your name, email address, phone number, the contents
								of the message and/or attachments you may send us, and any other
								information you may choose to provide. When you register for an
								Account, we may ask for your contact information, including
								items such as name, company name, address, email address, and
								telephone number.
							</BodyB2>
							<BodyB2Bold>
								How we use your information We use the information we collect in
								various ways, including to:
							</BodyB2Bold>
							<CustomList
								style={{
									listStyle: "square",
									padding: "0px 0px 0px 25px",
									margin: "0px",
								}}
								component="ul"
							>
								<li>Provide, operate, and maintain our website</li>
								<li>Improve, personalize, and expand our website</li>
								<li>Understand and analyze how you use our website</li>
							</CustomList>
						</ParagraphCombination>
						<ParagraphCombination>
							<BodyB2>
								Develop new products, services, features, and functionality.
								Communicate with you, either directly or through one of our
								partners, including for customer service, to provide you with
								updates and other information relating to the website, and for
								marketing and promotional purposes
							</BodyB2>
							<CustomListBigGap
								style={{
									listStyle: "square",
									padding: "0px 0px 0px 25px",
									margin: "0px",
								}}
								component="ul"
							>
								<li>Send you emails</li>
								<li>Find and prevent fraud</li>
								<li>Log Files</li>
							</CustomListBigGap>
						</ParagraphCombination>
						<ParagraphCombination>
							<BodyB2>
								Wiseadmit.io follows a standard procedure of using log files.
								These files log visitors when they visit websites. All hosting
								companies do this and a part of hosting services&apos;
								analytics. The information collected by log files include
								internet protocol (IP) addresses, browser type, Internet Service
								Provider (ISP), date and time stamp, referring/exit pages, and
								possibly the number of clicks. These are not linked to any
								information that is personally identifiable. The purpose of the
								information is for analyzing trends, administering the site,
								tracking users&apos; movement on the website, and gathering
								demographic information.
							</BodyB2>
						</ParagraphCombination>
					</SingleSection>
					<SingleSection>
						<HeadingH4>Cookies and web beacons</HeadingH4>
						<ParagraphCombination>
							<BodyB2>
								Like any other website, wiseadmit.io uses &apos;cookies&apos;.
								These cookies are used to store information including
								visitors&apos; preferences, and the pages on the website that
								the visitor accessed or visited. The information is used to
								optimize the users&apos; experience by customizing our web page
								content based on visitors&apos; browser type and/or other
								information.
							</BodyB2>
						</ParagraphCombination>
					</SingleSection>
					<SingleSection>
						<HeadingH4>Google double click DART cookie</HeadingH4>
						<ParagraphCombination>
							<BodyB2>
								Google is one of a third-party vendor on our site. It also uses
								cookies, known as DART cookies, to serve ads to our site
								visitors based upon their visit to www.website.com and other
								sites on the internet. However, visitors may choose to decline
								the use of DART cookies by visiting the Google ad and content
								network Privacy Policy at the following URL –
								https://policies.google.com/technologies/ads
							</BodyB2>
						</ParagraphCombination>
					</SingleSection>
					<SingleSection>
						<HeadingH4>Advertising partners privacy policies</HeadingH4>
						<ParagraphCombination>
							<BodyB2>
								You may consult this list to find the Privacy Policy for each of
								the advertising partners of wiseadmit.io. Third-party ad servers
								or ad networks uses technologies like cookies, JavaScript, or
								Web Beacons that are used in their respective advertisements and
								links that appear on wiseadmit.io, which are sent directly to
								users&apos; browser. They automatically receive your IP address
								when this occurs. These technologies are used to measure the
								effectiveness of their advertising campaigns and/or to
								personalize the advertising content that you see on websites
								that you visit.
							</BodyB2>
							<BodyB2Bold>
								Note:{" "}
								<BodyB2>
									Wiseadmit.io has no access to or control over these cookies
									that are used by third-party advertisers.
								</BodyB2>
							</BodyB2Bold>
						</ParagraphCombination>
					</SingleSection>
					<SingleSection>
						<HeadingH4>Third party privacy policies</HeadingH4>
						<ParagraphCombination>
							<BodyB2>
								We reserve the right to limit or suspend your access to the
								website if you breach these Terms or provide incorrect
								information. You are responsible for maintaining the
								confidentiality of your password, account and access key, as
								applicable, and we are not responsible for any actions taken by
								any other person or entity using your access information.
							</BodyB2>
						</ParagraphCombination>
					</SingleSection>
					<SingleSection>
						<HeadingH4>
							CCPA privacy rights (Do not sell my personal information)
						</HeadingH4>
						<ParagraphCombination>
							<BodyB2Bold>
								Under the CCPA, among other rights, California consumers have
								the right to:
							</BodyB2Bold>
							<CustomList
								style={{
									listStyle: "square",
									padding: "0px 0px 0px 25px",
									margin: "0px",
								}}
								component="ul"
							>
								<li>
									Request that a business that collects a consumer&apos;s
									personal data disclose the categories and specific pieces of
									personal data that a business has collected about consumers.
								</li>
								<li>
									Request that a business delete any personal data about the
									consumer that a business has collected.
								</li>
								<li>
									Request that a business that sells a consumer&apos;s personal
									data, not sell the consumer&apos;s personal data.e
								</li>
							</CustomList>
						</ParagraphCombination>
						<ParagraphCombination>
							<BodyB2Bold>GDPR Data Protection Rights</BodyB2Bold>
							<CustomList
								style={{
									listStyle: "square",
									padding: "0px 0px 0px 25px",
									margin: "0px",
								}}
								component="ul"
							>
								<li>
									The right to access – You have the right to request copies of
									your personal data. We may charge you a small fee for this
									service.
								</li>
								<li>
									The right to rectification – You have the right to request
									that we correct any information you believe is inaccurate. You
									also have the right to request that we complete the
									information you believe is incomplete.
								</li>
								<li>
									The right to erasure – You have the right to request that we
									erase your personal data, under certain conditions.
								</li>
								<li>
									The right to restrict processing – You have the right to
									request that we restrict the processing of your personal data,
									under certain conditions.
								</li>
								<li>
									The right to object to processing – You have the right to
									object to our processing of your personal data, under certain
									conditions.
								</li>
								<li>
									The right to data portability – You have the right to request
									that we transfer the data that we have collected to another
									organization, or directly to you, under certain conditions.
								</li>
							</CustomList>
							<BodyB2>
								If you make a request, we have one month to respond to you. If
								you would like to exercise any of these rights, please contact
								us.
							</BodyB2>
						</ParagraphCombination>
					</SingleSection>
					<SingleSection>
						<HeadingH4>Children&apos;s Information</HeadingH4>
						<ParagraphCombination>
							<BodyB2>
								Another part of our priority is adding protection for children
								while using the internet. We encourage parents and guardians to
								observe, participate in, and/or monitor and guide their online
								activity. Wiseadmit.io does not knowingly collect any personal
								identifiable information from children under the age of 13. If
								you think that your child provided this kind of information on
								our website, we strongly encourage you to contact us immediately
								and we will do our best efforts to promptly remove such
								information from our records.
							</BodyB2>
						</ParagraphCombination>
					</SingleSection>
				</Box>
			</Stack>
		</RootContainer>
	);
};

export default PrivacyPolicyHome;
