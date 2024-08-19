"use client";

import SignIn from "@/page-components/apply-now/SignIn";
import SignUp from "@/page-components/apply-now/SignUp";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ApplyNowHome = () => {
	const [isSignIn, setIsSignIn] = useState(true);
	const params = useSearchParams();
	const signup = params.get("signUp");
	useEffect(() => {
		if (signup) {
			setIsSignIn(false);
		}
	}, [params]);
	const handleLoginPages = (state: boolean) => setIsSignIn(state);

	return (
		<>
			{isSignIn ? (
				<SignIn handleLoginPages={handleLoginPages} />
			) : (
				<SignUp handleLoginPages={handleLoginPages} />
			)}
		</>
	);
};

export default ApplyNowHome;
