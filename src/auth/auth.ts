import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;
const isDevelopment = process.env.NODE_ENV === "development";

export const { auth, handlers, signIn, signOut,unstable_update } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const res = await ApiService.post({
            url: `${ApiConfig.students}/signin`,
            options: {
              email: credentials.email,
              password: credentials.password,
            },
            tokenNeeded: false,
          });
          console.log("res", res);
          if (res.data) {
            
            return {
              email: credentials.email,
              name: `${res.data?.data?.first_name} ${res.data?.data?.last_name}`,
              userId: res.data?.data?.id,
              accessToken: res.data?.accessToken,
              leadId: res.data?.leadId,
              imageUrl: res.data?.data?.photoUrl_key,
              phone: res.data?.data?.phone,
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from now
              ...res.data,
            };
          }
        } catch (err) {
          const { data } = (err as any).response as any;
          throw new Error(data?.errors[0]?.message ?? "Invalid Credentials");
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {

        // Encode user data into JWT
        const encodedToken = jwt.sign(
          {
            accessToken: user.accessToken,
            userId: user.userId,
            leadId: user.leadId,
            email: user.email,
            phone: user.phone,
            imageUrl: user.imageUrl,
            name: user.name,
            expires: user.expires.toISOString(),
          },
          JWT_SECRET,
          { expiresIn: "1d" }
        );
        token.encodedToken = encodedToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.encodedToken) {
        try {
          // Decode JWT
          const decodedToken = jwt.verify(
            token.encodedToken as string,
            JWT_SECRET
          ) as {
            accessToken: string;
            userId: string;
            email: string;
            name: string;
            imageUrl: string;
            leadId: string;
            expires: string;
            phone: string;
          };
          return {
            ...session,
            accessToken: decodedToken.accessToken,
            expires: new Date(decodedToken.expires),
            user: {
              ...session.user,
              email: decodedToken.email,
              name: decodedToken.name,
              imageUrl: decodedToken.imageUrl,
              phone: decodedToken.phone,
              leadId: decodedToken.leadId,
              userId: decodedToken.userId,
            },
          };
        } catch (error) {
          // Return session without the decoded data if there's an error
          return session;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/applynow", // Specify custom login page if you have one
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  logger: {
    error(code, ...message) {
      // if we want to implement logic for error login in future
      if (isDevelopment) {
        console.error(`[auth][error] ${code}`, ...message);
      }
    },
    warn(code, ...message) {
      if (isDevelopment) {
        console.warn(`[auth][warn] ${code}`, ...message);
      }
    },
    debug(code, ...message) {
      if (isDevelopment) {
        console.debug(`[auth][debug] ${code}`, ...message);
      }
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
});
