import type { IProgram } from "@/types/program";
import { createContext, createServerContext } from "react";

const ProgramsDetailContext = createContext<IProgram>({} as IProgram);
export default ProgramsDetailContext;
