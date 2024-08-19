import * as Yup from "yup";
import "yup-phone-lite";
declare module "yup" {
	interface StringSchema {
		isValidTestScore(name: string, message: string): Yup.StringSchema;
		isValidTestScoreForEachField(
			name: string,
			message: string,
		): Yup.StringSchema;
		customPhoneSign(): Yup.StringSchema;
	}
}

// Define custom method isValidTestScore
Yup.addMethod(Yup.StringSchema, "isValidTestScore", function (name, message) {
	return this.test(name, message, function (value, ctx) {
		if (ctx.parent.language_test) {
			if (ctx.parent.language_test.toLowerCase() === "ielts") {
				const isWithINRange = Number(value) <= 9 && Number(value) > 0;
				if (isWithINRange) {
					return true;
				}
				return ctx.createError({
					path: name,
					message: "must be with in range (1-9)",
				});
			}
			if (ctx.parent.language_test.toLowerCase() === "pte") {
				const isWithINRange = Number(value) <= 90 && Number(value) >= 10;
				if (isWithINRange) {
					return true;
				}
				return ctx.createError({
					path: name,
					message: "must be with in range (10-90)",
				});
			}
			if (ctx.parent.language_test.toLowerCase() === "hsk 1-2") {
				const isWithINRange = Number(value) <= 200 && Number(value) >= 0;
				if (isWithINRange) {
					return true;
				}
				return ctx.createError({
					path: name,
					message: "must be with in range (0-200)",
				});
			}
			if (ctx.parent.language_test.toLowerCase() === "hsk 3-6") {
				const isWithINRange = Number(value) <= 300 && Number(value) >= 0;
				if (isWithINRange) {
					return true;
				}
				return ctx.createError({
					path: name,
					message: "must be with in range (0-300)",
				});
			}
			if (ctx.parent.language_test.toLowerCase() === "toefl") {
				const isWithINRange = Number(value) <= 120 && Number(value) >= 0;
				if (isWithINRange) {
					return true;
				}
				return ctx.createError({
					path: name,
					message: "must be with in range (0-120)",
				});
			}
			if (ctx.parent.language_test.toLowerCase() === "duolingo") {
				const isWithINRange = Number(value) <= 160 && Number(value) >= 10;
				if (isWithINRange) {
					return true;
				}
				return ctx.createError({
					path: name,
					message: "must be with in range (10-160)",
				});
			}
			return value !== "";
		}
		return true;
	}).when("language_proficiency", {
		is: true,
		then: (schema) => schema.required("Required"),
	});
});

// Define custom method isValidTestScoreForEachField
Yup.addMethod(
	Yup.StringSchema,
	"isValidTestScoreForEachField",
	function (name, message) {
		return this.test(name, message, (value, ctx) => {
			if (ctx.parent.language_test) {
				if (ctx.parent.language_test.toLowerCase() === "ielts") {
					const isWithINRange = Number(value) <= 9 && Number(value) > 0;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (1-9)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "pte") {
					const isWithINRange = Number(value) <= 90 && Number(value) >= 10;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (10-90)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "hsk") {
					const isWithINRange = Number(value) <= 200 && Number(value) >= 0;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (0-200)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "toefl") {
					const isWithINRange = Number(value) <= 120 && Number(value) >= 0;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (0-120)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "duolingo") {
					ctx.parent[name] = ctx.parent.score;
					return true;
				}
				return value !== "";
			}
			return true;
		}).when(["language_proficiency", "test"], {
			is: (language: boolean, test: string) =>
				test !== "Duolingo" && language === true,
			then: (schema) => schema.required("Required"),
		});
	},
);

Yup.addMethod(Yup.string, "customPhoneSign", function () {
	return this.test(
		"custom-phone-validation",
		"Invalid phone number",
		function (value: any) {
			const { path, createError } = this;

			const isValidPhone = Yup.string().phone().isValidSync(value);
			if (!isValidPhone) {
				if (value && value.startsWith("+97797") && value.length === 14) {
					return true;
				}

				return createError({ path, message: "Invalid phone number" });
			}
			return true;
		},
	);
});

// Define custom method isValidTestScoreForEachField
Yup.addMethod(
	Yup.StringSchema,
	"isValidTestScoreForEachField",
	function (name, message) {
		return this.test(name, message, (value, ctx) => {
			if (ctx.parent.language_test) {
				if (ctx.parent.language_test.toLowerCase() === "ielts") {
					const isWithINRange = Number(value) <= 9 && Number(value) > 0;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (1-9)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "pte") {
					const isWithINRange = Number(value) <= 90 && Number(value) >= 10;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (10-90)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "hsk") {
					const isWithINRange = Number(value) <= 200 && Number(value) >= 0;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (0-200)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "toefl") {
					const isWithINRange = Number(value) <= 120 && Number(value) >= 0;
					if (isWithINRange) {
						return true;
					}
					return ctx.createError({
						path: name,
						message: "must be with in range (0-120)",
					});
				}
				if (ctx.parent.language_test.toLowerCase() === "duolingo") {
					ctx.parent[name] = ctx.parent.score;
					return true;
				}
				return value !== "";
			}
			return true;
		}).when(["language_proficiency", "test"], {
			is: (language: boolean, test: string) =>
				test !== "Duolingo" && language === true,
			then: (schema) => schema.required("Required"),
		});
	},
);

Yup.addMethod(Yup.string, "customPhone", function () {
	return this.test(
		"custom-phone-validation",
		"Invalid phone number",
		function (value: any) {
			const { path, createError } = this;

			const isValidPhone = Yup.string().phone().isValidSync(value);
			if (!isValidPhone) {
				if (value && value.startsWith("+97797") && value.length === 14) {
					return true;
				}

				return createError({ path, message: "Invalid phone number" });
			}
			return true;
		},
	);
});

export { Yup as GlobalYup };
