import { authentication } from "@/api/web/authentication.action";
import { debounce } from "lodash";
import * as Yup from "yup";

// declare module "yup" {
// 	interface StringSchema {
// 		isUniqueEmail(message: string): StringSchema;
// 		isUniquePhone(message: string): StringSchema;
// 	}
// }


const validateEmail = async (email: string) => {
	try {
		const res = await authentication({ email });
		return res.data.emailExists as boolean;
	} catch (error) {
		return false;
	}
};
const validatePhone = async (phone: string) => {
	try {
		const res = await authentication({ phone });
		return res.data.phoneExists as boolean;
	} catch (error) {
		return false;
	}
};

const memoizedEmailExists = (() => {
	const cache = new Map();
	return async (email: string) => {
		if (cache.has(email)) return cache.get(email);
		const result = await validateEmail(email);
		cache.set(email, result);
		return result;
	};
})();

const memoizedPhoneNumberExists = (() => {
	const cache = new Map();
	return async (phone: string) => {
		if (cache.has(phone)) return cache.get(phone);
		const result = await validatePhone(phone);
		cache.set(phone, result);
		return result;
	};
})();

// Debounced validation functions
export const debouncedEmailValidation = debounce(
	async (value: string, resolve: (isValid: boolean) => void) => {
		const isEmailValid = Yup.string().email().max(255).isValidSync(value);
		if (!isEmailValid) {
			resolve(true);
			return;
		}
		const emailExists = await memoizedEmailExists(value);
		return resolve(!emailExists);
	},
	800,
);

export const debouncedPhoneValidation = debounce(
	async (value: string, resolve: (isValid: boolean) => void) => {
		const phoneExists = await memoizedPhoneNumberExists(value);
		return resolve(!phoneExists);
	},
	800,
);

// Yup.addMethod(Yup.string, "isUniquePhone", function (errorMessage: string) {
//   return this.test("isUniquePhone", errorMessage, async function (value) {
//     if (!value) {
//       return true;
//     }
//     const { path, createError } = this;

//     try {
//       const res = await validatePhone({ phone: value! });
//       if (res.data.phoneExists) {
//         throw createError({ path, message: errorMessage });
//       }
//       return true;
//     } catch (err) {
//       throw createError({ path, message: errorMessage });
//     }
//   });
// });
// Yup.addMethod(Yup.string, "isUniqueEmail", function (errorMessage: string) {
//   return this.test("isUniqueEmail", errorMessage, async function (value) {
//     if (!value) {
//       return true;
//     }
//     const { path, createError } = this;

//     try {
//       const res = await validateEmail({ email: value! });
//       if (res.data.emailExists) {
//         throw createError({ path, message: errorMessage });
//       }
//       return true;
//     } catch (err) {
//       throw createError({ path, message: errorMessage });
//     }
//   });
// });

export { Yup as PartnerYup };
