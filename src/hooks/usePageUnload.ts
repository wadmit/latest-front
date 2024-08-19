import { useEffect } from "react";

export const usePageUnload = () => {
  const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };
  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);
};
