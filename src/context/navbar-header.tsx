"use client";
import { createContext } from "react";

interface IContextNavbar {
	navbarHeader: string;
	changeNavbarHeader: (header: string) => void;
}
const NavBarHeaderContext = createContext<IContextNavbar>({
	navbarHeader: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	changeNavbarHeader: (header: string) => {},
});
export default NavBarHeaderContext;
