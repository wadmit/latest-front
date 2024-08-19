"use server";
import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const postStripePayment = async ({
  formValues,
  type,
}: {
  formValues: string[];
  type: string;
}) => {
  try {
    const res = await ApiService.post({
      url: `${ApiConfig.students}/applications/payment?type=${type}`,
      options: {
        applications: formValues,
      },
      tokenNeeded: true,
    });
    if (res.data) {
      return res.data;
    }
    throw new Error("Failed to create Stripe Checkout Session");
  } catch (error) {
    Promise.reject(error);
  }
};

export const postEsewaPayment = async ({
  formValues,
  type,
}: {
  formValues: string[];
  type: string;
}) => {
  try {
    const res = await ApiService.post({
      url: `/web/esewa?type=${type}`,
      options: {
        applications: formValues,
      },
      tokenNeeded: true,
    });
    if (res.data) {
      return res.data;
    }
    Promise.reject("Failed to create Esewa Checkout Session");
  } catch (error) {
    Promise.reject(error);
  }
};

export const paymentEsewaFailed = async (token: string) => {
  try {
    const res = await ApiService.get({
      url: `/web/esewa/failed?signature=${token}`,
      tokenNeeded: false,
    });
    if (res.data) {
      return res.data;
    }
    throw new Error("Failed to verify Esewa Payment");
  } catch (error) {
    Promise.reject("An error occurred");
  }
};
export const paymentEsewaVerify = async (token: string) => {
  try {
    const res = await ApiService.get({
      url: `/web/esewa/verify?token=${token}`,
      tokenNeeded: false,
    });
    if (res.data) {
      return res.data;
    }
    throw new Error("Failed to verify Esewa Payment");
  } catch (error) {
    Promise.reject("An error occurred");
  }
};
