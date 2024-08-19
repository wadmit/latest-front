import { createContext } from "react";

const DocumentContext = createContext<{
  activeStep: number;
  reaskedDocuments: string[];
}>({
  activeStep: 0,
  reaskedDocuments: [],
});
export { DocumentContext };
