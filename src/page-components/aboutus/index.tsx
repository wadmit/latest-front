import React from "react";
import AboutUsHero from "@/page-components/aboutus/AboutUsHero";
import OurPeople from "@/page-components/aboutus/components/OurPeople";
import Career from "@/page-components/aboutus/components/Career";
import AboutJoin from "@/page-components/aboutus/components/AboutJoin";
import AboutMission from "@/page-components/aboutus/components/AboutMission";

const AboutUsHome = () => {
	return (
		<>
			<AboutUsHero />
			<AboutMission />
			<OurPeople />
			<AboutJoin />
			<Career />
		</>
	);
};

export default AboutUsHome;
