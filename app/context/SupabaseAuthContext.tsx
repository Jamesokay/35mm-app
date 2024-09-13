"use client";

import { createContext, useContext, ReactNode } from "react";
import { User } from "@supabase/supabase-js";

const SupabaseAuthContext = createContext<User | null>(null);

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  return context;
};

export const SupabaseAuthContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  return (
    <SupabaseAuthContext.Provider value={user}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};
