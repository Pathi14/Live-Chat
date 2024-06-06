"use client";
import { User } from "@/components/sidebar/sidebar";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type AuthContextType = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({
  setUser: () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>({
    id: "user#1",
    name: "Paul-Henry",
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
