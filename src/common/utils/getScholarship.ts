import { EBaseCurrency } from "@/types/university";

export type IScholarShipRangeType = {
	"60-74": {
		value: number | string;
		type: "amount";
	};
	"40-100": {
		value: number | string;
		type: "percent";
	};
	"75-100": {
		value: number | string;
		type: "percent";
	};
};

type CalculateProps = {
	scholarShipRange: IScholarShipRangeType;
	tutionFee: number;
	wisescore: number;
};
type RangeProps = {
	scholarShipRange: IScholarShipRangeType;
	currency: EBaseCurrency;
	wisescore: number;
};

export function calculateScholarship({
	scholarShipRange,
	tutionFee,
	wisescore,
}: CalculateProps) {
	if (!scholarShipRange) return tutionFee;

	let scholarshipAmount: number = tutionFee;

	for (const range in scholarShipRange) {
		const [min, max] = range.split("-").map(Number);
		const thisKey = range as keyof IScholarShipRangeType;
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
}: RangeProps) {
	if (!scholarShipRange) return false;

	let scholarshipInfo = null;

	for (const range in scholarShipRange) {
		const [min, max] = range.split("-").map(Number);
		const thisKey = range as keyof IScholarShipRangeType;
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
