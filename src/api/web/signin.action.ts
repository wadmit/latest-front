"use server";

import { signIn } from "@/auth/auth";
import { AuthError } from "next-auth";

export async function signInUser({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	try {
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		if (res) {
			return res;
		}
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CallbackRouteError":
					if (
						error.cause &&
						typeof error.cause === "object" &&
						"err" in error.cause
					) {
						const cause = error.cause as { err: { code?: string } };
						if (cause.err) {
							return { error: error?.cause?.err?.message ?? "An authentication error occurred" };
						}
					}
				case "CredentialsSignin":
					return { error: "Invalid credentials" };
				default:
					return { error: "An authentication error occurred" };
			}
		}

		throw error;
	}
}
