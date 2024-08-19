import type { IProgram } from "@/types/program";
import type {
	IRecommendation,
	TRecommendationType,
	TUniversitiesDetail,
} from "@/types/utils";

export const sanitizeRecommendation = (
	recommendation: TUniversitiesDetail | IProgram,
	type: TRecommendationType,
): IRecommendation[] => {
	if (type === "universities" && "similarUniversities" in recommendation) {
		return recommendation.similarUniversities &&
			recommendation.similarUniversities.length > 0
			? recommendation.similarUniversities?.map((uni) => ({
					name: uni.name,
					subName: uni?.location || "",
					image_key: uni?.logo_key || "",
					slug: uni.slug,
				}))
			: [];
	}
	if (type === "programs" && "similarPrograms" in recommendation) {
		return recommendation.similarPrograms &&
			recommendation.similarPrograms.length > 0
			? recommendation.similarPrograms?.map((program: any) => ({
					name: program.name,
					subName: program?.university?.name ?? "",
					image_key: program?.university?.logo_key ?? "",
					slug: program.slug,
				}))
			: [];
	}
	return [];
};
