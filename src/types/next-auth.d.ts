import { DefaultSession, User } from "next-auth";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken: string;
		expires: Date;
		user: {
			email: string;
			name: string;
			imageUrl: string;
			userId: string;
			leadId: string;
			phone: string;
		};
	}

	interface User {
		email: string;
		name: string;
		accessToken: string;
		imageUrl: string;
		expires: Date;
		userId: string;
		phone: string;
		leadId: string;
	}
}
