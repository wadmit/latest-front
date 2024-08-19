import type { INavbarMenu } from "@/components/common";
import type { IFAQData } from "@/page-components/faq/utils/types";
import { EBaseCurrency } from "@/types/university";
import type { ScholarShipRangeType } from "@/types/utils";
import { Box, Typography } from "@mui/material";

export const navProgramMenu: INavbarMenu[] = [
	{
		name: "About",
		link: "#about",
	},
	{
		name: "Costs",
		link: "#costs",
	},
	{
		name: "Scholarships",
		link: "#scholarships",
	},
	{
		name: "Pre requisties",
		link: "#pre_requisties",
	},
	{
		name: "FAQ",
		link: "#faq",
	},
];

export const scholarshipsColumn: readonly {
	id: string;
	label: string;
	minWidth?: number;
	align?: "right" | "left" | "center";
}[] = [
	{ id: "scholarships_type", label: "Scholarships type", minWidth: 100 },
	{ id: "benefit", label: "Benefits", minWidth: 100 },
	{ id: "stipend", label: "Stipend", minWidth: 100 },
];

export function calculateScholarship({
	scholarShipRange,
	tutionFee,
	wisescore,
}: {
	scholarShipRange: ScholarShipRangeType;
	tutionFee: number;
	wisescore: number;
}) {
	if (!scholarShipRange) return tutionFee;

	let scholarshipAmount: number = tutionFee;

	for (const range in scholarShipRange) {
		const [min, max] = range.split("-").map(Number);
		const thisKey = range as keyof ScholarShipRangeType;
		if (wisescore >= min && wisescore <= max + 0.99) {
			const { value, type } = scholarShipRange[thisKey];
			if (type === "amount") {
				scholarshipAmount -= Number(value);
			} else if (type === "percent") {
				const percentDiscount = (Number(value) / 100) * tutionFee;
				scholarshipAmount -= percentDiscount;
			}
			break;
		}
	}

	return scholarshipAmount;
}

export function getScholarshipInfo({
	scholarShipRange,
	currency,
	wisescore,
}: {
	scholarShipRange: ScholarShipRangeType;
	currency: EBaseCurrency;
	wisescore: number;
}) {
	if (!scholarShipRange) return false;

	let scholarshipInfo = null;

	for (const range in scholarShipRange) {
		const [min, max] = range.split("-").map(Number);
		const thisKey = range as keyof ScholarShipRangeType;
		if (wisescore >= min && wisescore <= max + 0.99) {
			const { value, type } = scholarShipRange[thisKey];

			if (type === "amount") {
				if (value === 0) {
					return false;
				}
				scholarshipInfo = `${value} ${
					currency?.toLocaleUpperCase() ?? "USD"
				} Scholarship`;
			} else if (type === "percent") {
				if (value === 0) {
					return false;
				}
				const percentDiscount = Number(value);
				scholarshipInfo = `Received ${percentDiscount}% scholarship on tuition fee`;
			}
			break;
		}
	}

	return scholarshipInfo;
}

export const koreaFaq: IFAQData[] = [
	{
		title: "Can I extend my stay in South Korea after graduation?",
		details:
			"Yes, international students can apply for a D-10 (job-seeking) visa after graduation, which allows them to stay in South Korea for up to six months while searching for employment. Once you secure a job, you can apply for a work visa.",
	},
	{
		title: "Admission Deadline",
		details: (
			<>
				The admission deadlines for universities in South Korea can vary
				significantly depending on the institution and the specific program.
				Generally, universities in South Korea have two main intakes for
				international students: the Spring (March) intake and the Fall
				(September) intake.
				<p />
				<Box>
					Spring Intake(March)
					<Typography component="ul">
						<Typography component="li">
							Application Period: September to November (of the previous year)
						</Typography>
						<Typography component="li">
							Notification of Admission Results: December to January
						</Typography>
						<Typography component="li">
							Enrollment: January to February
						</Typography>
					</Typography>
				</Box>
				<Box mt="10px">
					Fall Intake(September)
					<Typography component="ul">
						<Typography component="li">
							Application Period: March to May
						</Typography>
						<Typography component="li">
							Notification of Admission Results: June to July
						</Typography>
						<Typography component="li">Enrollment: July to August</Typography>
					</Typography>
				</Box>
			</>
		),
	},
	{
		title:
			"What are the admission requirements for international students in South Korea?",
		details:
			"Admission requirements vary by university and program. Generally, you need to provide your academic transcripts, proof of language proficiency (Korean or English), letters of recommendation, a personal statement, and a copy of your passport. Some programs may also require standardized test scores, such as the SAT or GRE.",
	},
	{
		title: "Do I need to speak Korean to study in South Korea?",
		details:
			"While many universities offer programs in English, it is beneficial to have a basic understanding of Korean. Some programs, especially at the undergraduate level, may require proficiency in Korean, which can be demonstrated through the Test of Proficiency in Korean (TOPIK).",
	},
	{
		title: "How can I apply for a student visa?",
		details:
			"After receiving an acceptance letter from a South Korean university, you need to apply for a D-2 (student) visa at your nearest South Korean embassy or consulate. You will need to submit your passport, acceptance letter, visa application form, and other required documents.",
	},
	{
		title: "What are the tuition fees and living expenses?",
		details:
			" Tuition fees vary depending on the university and program but generally range from USD 4,000 to USD 20,000 per year. Living expenses, including accommodation, food, transportation, and personal expenses, can range from USD 500 to USD 1,200 per month.",
	},
	{
		title: "Are there scholarships available for international students?",
		details:
			" Yes, many South Korean universities offer scholarships for international students. Additionally, the Korean Government Scholarship Program (KGSP) provides full scholarships covering tuition, living expenses, and airfare. It's advisable to check with your university and the National Institute for International Education (NIIED) for available scholarships.",
	},
	{
		title: "What accommodation options are available?",
		details:
			" Most universities offer dormitory options for international students, which are often more affordable than private housing. Alternatively, students can choose to rent apartments or stay in boarding houses (goshiwon). It's recommended to arrange accommodation before arriving in South Korea.",
	},
	{
		title: "Can international students work while studying?",
		details:
			" Yes, international students holding a D-2 visa can work part-time up to 20 hours per week during semesters and full-time during vacation periods. However, students must obtain permission from their university and the Immigration Office.",
	},
];

export const chinaFaq: IFAQData[] = [
	{
		title:
			"What are the admission requirements for international students in China?",
		details: (
			<>
				For students to get admission, there are few essential things to keep in
				mind.The following documents are required:
				<p />
				<Typography component="ul">
					<Typography component="li">Passport</Typography>
					<Typography component="li">PP- sized Photo</Typography>
					<Typography component="li">High School Transcript</Typography>
					<Typography component="li">High School Certificate</Typography>
					<Typography component="li">Non-Criminal Report</Typography>
					<Typography component="li">Medical Report</Typography>
				</Typography>
			</>
		),
	},
	{
		title: "How much does it cost to study in China?",
		details:
			"Cost varies according to the subjects and universities. Approximately, the tuition fee is usually less than $3500 per year in Top-Chinese Universities; which in comparison to USA, Australia, UK, is more than 10 times affordable. With WiseAdmit students can secure upto 100% scholarship in one of the partnered universities.",
	},
	{
		title:
			"What is the quality of education like for international students who want to Study in China?",
		details:
			"Chinese Government’s extensive investment in education has made China one of the Top-destination for international students. Many universities in China have a strong reputation for research and innovation, and offer quality programs in engineering, science, and technology.  This means the quality of education is excellent as Chinese universities are increasingly getting top positions in global rankings.",
	},
	{
		title:
			"What is the cost of living like for international students in China?",
		details:
			"Living Cost is extremely low in the case of international students in China. On-campus accommodation can cost around $700 for a whole year. Similarly, other cost of living including food, transportation, etc. can cost less than $1900 per year.",
	},
	{
		title:
			"How does studying in China benefit international students in their future careers?",
		details:
			"Studying in China is becoming a popular destination for international students. Besides cheap tuition fee and top-ranking universities, future opportunities is a major reason. Post graduation employment rate is more than 90% in China for international students. Reason being many of the biggest companies of the world today are operating in China.",
	},
	{
		title:
			"What are the most popular cities for international students to study in China?",
		details: (
			<>
				The most popular cities:
				<p />
				<Typography component="ul">
					<Typography component="li">Nanjing</Typography>
					<Typography component="li">Beijing</Typography>
					<Typography component="li">Shanghai</Typography>
					<Typography component="li">Hohai</Typography>
					<Typography component="li">Shenzen</Typography>
					<Typography component="li">Zhejiang</Typography>
					<Typography component="li">Hangzhou</Typography>
				</Typography>
			</>
		),
	},
	{
		title: "How safe is it for international students in China?",
		details:
			"China is well known for being very safe for international students and tourists. To put things into perspective, Global Peace Index 2023 has ranked China 50 places higher than USA.",
	},
	{
		title:
			"What kind of support services are available to international students in China?",
		details:
			"WiseAdmit can ensure exclusive support for international students before, during and after applying to study in China. Our representative can ensure airport pickups, on-campus accommodation(condition applied), partial scholarships, part-time jobs etc.",
	},
	{
		title:
			"What is the job market like for international students after graduation in China?",
		details:
			"Job market for international students in China is extremely rewarding. Once you graduate, it will be obvious that you have come through a big challenge of studying in China, and will be highly demanded. For example, in one of our partnered universities, over 3000 companies like COMAC, Airbus, Apple, Huawei., etc. come every year to hire for jobs in university’s placement fair.",
	},
	{
		title:
			"What is the language of instruction in universities in China for international students?",
		details:
			"Students can choose between Chinese-taught as well as English-taught programs in China. You can apply for programs of your choice in English-taught module  through our platform.",
	},
];
