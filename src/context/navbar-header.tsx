"use client";
import { createContext } from "react";

interface IContextNavbar {
  navbarHeader: string;
  changeNavbarHeader: (header: string) => void;
}
const NavBarHeaderContext = createContext<IContextNavbar>({
  navbarHeader: "",
  changeNavbarHeader: (header: string) => {},
});
export default NavBarHeaderContext;
