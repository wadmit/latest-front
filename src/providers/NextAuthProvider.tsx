"use client";
import type { ReactNode } from "react";
import { useMemo } from "react";

import { SessionProvider } from "next-auth/react";

const NextAuthProvider = ({ children }: { children: ReactNode }) => {
  const memoizedSessionProvider = useMemo(
    () => <SessionProvider>{children}</SessionProvider>,
    [children]
  );
  return memoizedSessionProvider;
};

export default NextAuthProvider;
