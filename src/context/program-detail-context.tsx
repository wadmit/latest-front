import type { IProgram } from "@/types/program";
import { createContext, } from "react";

const ProgramsDetailContext = createContext<IProgram>({} as IProgram);
export default ProgramsDetailContext;
