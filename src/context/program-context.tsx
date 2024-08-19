import type { IProgram } from '@/types/program';
import { createContext } from 'react';


const ProgramContext = createContext<IProgram[]>([]);

const ProgramsInsideUniContext = createContext<IProgram[]>([]);
export { ProgramContext, ProgramsInsideUniContext };
