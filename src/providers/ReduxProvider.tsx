"use client";
import React, { useRef } from "react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/global-states/store";
import type { AppStore } from "@/global-states/store";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
