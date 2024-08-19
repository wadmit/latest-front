import type { IWisescoreForm, TShowIn } from "@/types/wisescore";

export const getTotalSteps = (
	steps: IWisescoreForm[],
	currentProgram: TShowIn | "",
) => {
	const filteredSteps = steps.filter(
		(step) => step.showIn === "both" || step.showIn === currentProgram,
	);
	return filteredSteps.length;
};
