import { ApiConfig } from "@/constants";
import ApiService, { request } from "@/services/api.service";

export const authentication = async ({
  email,
  phone,
}: {
  email?: string;
  phone?: string;
}) => {
  try {
    ("use server");
    const response: any = await ApiService.post({
      url: `${ApiConfig.authentication}`,
      options: { email, phone },
      tokenNeeded: false,
    });
    if (response) return Promise.resolve(response);
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data: any) => {
  try {
    ("use server");
    const response = await ApiService.post({
      url: `${ApiConfig.students}/signup`,
      options: data,
      tokenNeeded: false,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const forgotPassword = async (formValues: {email: string}) => {
  try {
    const response = await ApiService.post({
      url: `${ApiConfig.students}/forgotpassword`,
      options: formValues,
      tokenNeeded: false,
    });

    return response;
    
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (formValues: {password: string; token: string}) => {
  try {
    return await request({
			url: `${ApiConfig.students}/resetpassword/${formValues.token}`,
			method: "POST",
      mode: 'cors',
			data: {password: formValues.password},
		});
  } catch (error) {
    throw error
  }
}