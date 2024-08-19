import type { IUniversity } from "@/types/university";
import { createContext, createServerContext } from "react";

const UniversityDetailContext = createContext<IUniversity>({} as IUniversity);
export default UniversityDetailContext;
