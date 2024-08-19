// import { ApiConfig } from "@/constants";
// import ApiService from "@/services/api.service";

// export const uploadPartnerDocument = async (data: any) => {
//   try {
//     const response = await ApiService.post({
//       url: `${ApiConfig.partnerdocument}`,
//       options: {
//         data: data,
//       },
//       tokenNeeded: false,
//     });
//     return response;
//   } catch (error) {
//     console.log("Error In api call", error);
//     return Promise.reject(error);
//   }
// };

import { ApiConfig } from "@/constants";
import { request } from "@/services/api.service";

export const uploadPartnerDocument = async (data: any) => {
	try {
		return await request({
			url: `${ApiConfig.partnerdocument}`,
			method: "POST",
			data: data,
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
