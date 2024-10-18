import { EAnalyticsFieldName } from "@/types/mix-panel-analytic";
import * as Yup from "yup";

// declare module "yup" {
//   interface StringSchema<
//     TType extends Maybe<string> = string | undefined,
//     TContext extends AnyObject = AnyObject,
//     TOut extends TType = TType
//   > extends Yup.BaseSchema<TType, TContext, TOut> {
//     isValidTestScore(
//       name: string,
//       message: string
//     ): RequiredStringSchema<TType, TContext>;

//     isValidTestScoreForEachField(
//       name: string,
//       message: string
//     ): RequiredStringSchema<TType, TContext>;
//   }
// }
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
  }
);
export interface IWiseScore {
  dream_degree: string;
  discipline: string;
  preferredCountry: string;
  preferredIntake: number;
  nationality: string;
  age: string;
  language: boolean;
  language_proficiency: boolean;
  program_type: string;
  program_type_name: string;
  gapYear: string;
  highest_level_of_education: string;
  grade_id: string;
  grade: string;
  maths: string;
  english: string;
  physics: string;
  biology: string;
  chemistry: string;
  sub_disciplines: string[];
  education_status: string;
  test: string;
  score: string;
  passport: boolean;

  // listening: string;
  // reading: string;
  // speaking: string;
  // writing: string;

  work_experience: string;
  conference_presentation: string;
  journal_publication: string;
  awards: string;
  china_study: boolean;
  chinese_language_skill: string;
  language_overall_score: string;
  language_test: string;
}

export const INITIAL_WISE_STATE = {
  dream_degree: "",
  preferredCountry: "",
  preferredIntake: 0,
  discipline: "",

  nationality: "",
  age: "",
  language_proficiency: false,
  passport: false,
  program_type: "",
  gapYear: "",
  highest_level_of_education: "",
  grade_id: "",
  grade: "",
  maths: "",
  english: "",
  physics: "",
  biology: "",
  chemistry: "",
  sub_disciplines: [],

  education_status: "",
  test: "",
  score: "",
  max: 0,
  min: 0,

  // listening: "",
  // reading: "",
  // speaking: "",
  // writing: "",

  work_experience: "",
  conference_presentation: "",
  journal_publication: "",
  awards: "",
  china_study: false,
  chinese_language_skill: "",

  language_overall_score: "",
  language_test: "",

  // for mixpanel data
  [EAnalyticsFieldName.PROGRAM]: "",
  [EAnalyticsFieldName.DISCIPLINE]: "",
  [EAnalyticsFieldName.SUBDISCIPLINE]: [],
  [EAnalyticsFieldName.NATIONALITY]: "",
  [EAnalyticsFieldName.HIGHEST_EDUCATION]: "",
  [EAnalyticsFieldName.GRADE_SCHEMA]: "",
};

Yup.addMethod(Yup.string, "isValidTestScore", function (name, message, test) {
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
    then: Yup.string().required("Required"),
  } as any);
});
// ---------------------------------------------------isValidTestScoreForEachField---------------------------------------------------
Yup.addMethod(
  Yup.string,
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
          console.log(
            "ctx.parent.test.toLowerCase() === 'duolingo'",
            ctx.parent
          );
          return true;
        }
        return value !== "";
      }
      return true;
    }).when(["language_proficiency", "test"], {
      is: (language: boolean, test: string) =>
        test !== "Duolingo" && language === true,
      then: Yup.string(),
    } as any);
  }
);

export const WISESCORE_FORM_VALIDATION = Yup.object().shape({
  // page1
  preferredCountry: Yup.string().required(
    "Preferred Country must be specified"
  ),
  preferredIntake: Yup.string().required("Preferred Intake must be specified"),
  gapYear: Yup.string().required("Gap year is required"),
  program_type: Yup.string().required("Required"),
  // program_type_name: Yup.string().required('Required'),
  discipline: Yup.string().required("Discipline is Required"),

  nationality: Yup.string().required("Country is Required"),
  age: Yup.string()
    .test("age", "age must be greater than 16", (value) => value !== "13-16")
    .required("Required"),
  language_proficiency: Yup.boolean(),

  highest_level_of_education: Yup.string().required("Required"),
  grade_id: Yup.string().required("Required"),
  grade: Yup.string()
    .test("grade", (value, ctx) => {
      const { min, max } = ctx.parent;
      // if (ctx.parent[EFieldName.GRADE_SCHEMA]) {
      //   min = 0;
      //   max = 100;
      // }
      // if (ctx.parent.grade_id === '2') {
      //   min = 0.4;
      //   max = 4;
      // }
      if (!Number.isNaN(max) && !Number.isNaN(min)) {
        if (Number(value) >= min && Number(value) <= max) {
          return true; // Value is valid
        }
        return ctx.createError({
          message: "Grade must be with in range of your scale",
          path: "grade",
        });
        // Value is invalid
      }
      return true;

      // If min or max is not a number, skip the validation
    })
    .required("Required"),

  maths: Yup.string()
    .test("maths", (value, ctx) => {
      const { min, max } = ctx.parent;
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        if (Number(value) >= min && Number(value) <= max) {
          return true; // Value is valid
        }
        return ctx.createError({
          message: `Grade must be with in range (${min}-${max})`,
          path: "maths",
        });
        // Value is invalid
      }
      return true; // If min or max is nstring, skip the validation
    })
    .required("Required"),
  english: Yup.string()
    .test("english", (value, ctx) => {
      const { min, max } = ctx.parent;
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        if (Number(value) >= min && Number(value) <= max) {
          return true; // Value is valid
        }
        return ctx.createError({
          message: `Grade must be with in range (${min}-${max})`,
          path: "english",
        });
        // Value is invalid
      }
      return true; // If min or max is not a number, skip the validation
    })
    .required("Required"),
  physics: Yup.string()
    .test("physics", (value, ctx) => {
      const { min, max } = ctx.parent;
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        if (Number(value) >= min && Number(value) <= max) {
          return true; // Value is valid
        }
        return ctx.createError({
          message: `Grade must be with in range (${min}-${max})`,
          path: "physics",
        });
        // Value is invalid
      }
      return true; // If min or max is not a number, skip the validation
    })
    .required("Required"),
  biology: Yup.string()
    .test("biology", (value, ctx) => {
      const { min, max } = ctx.parent;
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        if (Number(value) >= min && Number(value) <= max) {
          return true; // Value is valid
        }
        return ctx.createError({
          message: `Grade must be with in range (${min}-${max})`,
          path: "biology",
        });
        // Value is invalid
      }
      return true; // If min or max is not a number, skip the validation
    })
    .required("Required"),
  chemistry: Yup.string()
    .test("chemistry", (value, ctx) => {
      const { min, max } = ctx.parent;
      if (!Number.isNaN(min) && !Number.isNaN(max)) {
        if (Number(value) >= min && Number(value) <= max) {
          return true; // Value is valid
        }
        return ctx.createError({
          message: `Grade must be with in range (${min}-${max})`,
          path: "chemistry",
        });
        // Value is invalid
      }
      return true; // If min or max is not a number, skip the validation
    })
    .required("Required"),
  sub_disciplines: Yup.array()
    .of(Yup.string())
    .min(1)
    .label("Sub Disciplines")
    .required("Required"),
  education_status: Yup.string(),
  test: Yup.string().when("language_proficiency", {
    is: true,
    then: Yup.string().required("Proficiency must be provided"),
  } as any),
  score: Yup.string().isValidTestScore("score", "score must be with in range"),
  language_overall_score: Yup.string().isValidTestScore(
    "language_overall_score",
    "score must be with in range"
  ),

  max: Yup.number(),
  min: Yup.number(),

  // listening: Yup.string()
  //   .isValidTestScoreForEachField(
  // 	'listening',
  // 	'listening must be with in range'
  //   )
  //   .required('Required'),
  // reading: Yup.string()
  //   .isValidTestScoreForEachField('reading', 'reading must be with in range')
  //   .required('Required'),
  // speaking: Yup.string()
  //   .isValidTestScoreForEachField('speaking', 'speaking must be with in range')
  //   .required('Required'),
  // writing: Yup.string()
  //   .isValidTestScoreForEachField('writing', 'writing must be with in range')
  //   .required('Required'),
  work_experience: Yup.string().required("Required"),
  conference_presentation: Yup.string().required("Required"),
  journal_publication: Yup.string().required("Required"),
  awards: Yup.string().required("Required"),
  chinese_language_skill: Yup.string().required("Required"),

  // listening: Yup.string().when(['language', 'test'], {
  //   is: (language: boolean, test: string) =>
  //     test !== 'Duolingo' && language === true,
  //   then: Yup.string().required('Required'),
  // }),
  // reading: Yup.string().when(['language', 'test'], {
  //   is: (language: boolean, test: string) =>
  //     test !== 'Duolingo' && language === true,
  //   then: Yup.string().required('Required'),
  // }),
  // speaking: Yup.string().when(['language', 'test'], {
  //   is: (language: boolean, test: string) =>
  //     test !== 'Duolingo' && language === true,
  //   then: Yup.string().required('Required'),
  // }),
  // writing: Yup.string().when(['language', 'test'], {
  //   is: (language: boolean, test: string) =>
  //     test !== 'Duolingo' && language === true,
  //   then: Yup.string().required('Required'),
  // }),
});

export const FORM_VALIDATION_WISESCORE_SUBMIT = Yup.object().shape({
  email: Yup.string()
    .matches(/^[^\s][\s\S]*$/, "Email cannot start with a space")
    .email("Invalid Email")
    .required("Required"),
  fullName: Yup.string()
    .matches(/^[^\s][\s\S]*$/, "Full Name cannot start with a space")
    .required("Required"),
  phone: Yup.string().required("Required").customPhoneSign().label("Phone"),
});
