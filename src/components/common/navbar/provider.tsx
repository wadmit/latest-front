import {
	BlogsIcon,
	CostCalculatorIcon,
	InstitutionIcon,
	NewsIcon,
	RecrutingPartnersIcon,
	RevenueIcon,
} from "@/components/common/navbar/svg";

interface NavbarMenuPropsOptions {
	name: string;
	link: string;
	desc: string;
	icon: React.ReactNode;
}

export interface INavbarMenu {
	name: string;
	link?: string;
	options?: NavbarMenuPropsOptions[];
	isDropdown?: boolean;
}

export const navbarLinks: INavbarMenu[] = [
	{
		name: "Students",
		link: "/students",
	},
	{
		name: "Universities",
		link: "/universities",
	},
	{
		name: "Programs",
		link: "/programs",
	},
	{
		link: "/wisescore",
		name: "Check WiseScore®",
	},
	{
		name: "Company",
		isDropdown: true,
		options: [
			{
				name: "Institution",
				link: "/institution",
				desc: "Enroll the right student",
				icon: <InstitutionIcon />,
			},
			{
				name: "Cost Calculator",
				link: "/costcalculator",
				desc: "Calculate your cost",
				icon: <CostCalculatorIcon />,
			},
			{
				name: "Recruiting Partners",
				link: "/recruiting-partners",
				desc: "Collaborate with WiseAdmit",
				icon: <RecrutingPartnersIcon />,
			},
			{
				name: "Blogs",
				link: "/blogs",
				desc: "Read recent blogs",
				icon: <BlogsIcon />,
			},
			{
				name: "Revenue Calculator",
				link: "/revenue-calculator",
				desc: "Calculate your earnings",
				icon: <RevenueIcon />,
			},
			{
				name: "News",
				link: "/news",
				desc: "What's new",
				icon: <NewsIcon />,
			},
		],
	},
];

export const selectItems = {
	position: "relative",
	backgroundImage: "linear-gradient(to right,#ff6b26,#ff6b26)",
	backgroundRepeat: "no-repeat",
	backgroundSize: "0% 1px",
	backgroundPosition: "left bottom",
	transition: "background-size 0.3s ease",
	"&:hover": {
		backgroundSize: "100% 2px",
		color: "#ff6b26",
	},
};
