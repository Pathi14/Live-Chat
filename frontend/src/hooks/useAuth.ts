import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export function useAuth() {
  const authProps = useContext(AuthContext);

  return authProps;
}
