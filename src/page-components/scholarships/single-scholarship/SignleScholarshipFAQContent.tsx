// import FAQAccordionComp from "@/components/common/faq/FAQAccordionComp";

// export function FaqSectionFoundation({ country }: { country?: string }) {
// 	const faqData = country === "South Korea" ? koreaFaq : chinaFaq;
// 	return (
// 		<Box display="flex" flexDirection="column" gap="20px">
// 			{faqData.map(({ title, details }) => (
// 				<FAQAccordionComp title={title} details={details} key={`_${title}`} />
// 			))}
// 		</Box>
// 	);
// }

// export function FaqSectionFoundationSlice({ country }: { country?: string }) {
// 	const faqData = country === "South Korea" ? koreaFaq : chinaFaq;
// 	return (
// 		<Box display="flex" flexDirection="column" gap="20px">
// 			{faqData.slice(0, 3).map(({ title, details }) => (
// 				<FAQAccordionComp title={title} details={details} key={`_${title}`} />
// 			))}
// 		</Box>
// 	);
// }
