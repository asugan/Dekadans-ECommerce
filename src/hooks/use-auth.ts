import { authClient } from "@/lib/auth-client";

export const useAuth = () => {
  const signIn = async (email: string, password: string) => {
    const result = await authClient.signIn.email({
      email,
      password,
    });
    return result;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const result = await authClient.signUp.email({
      email,
      password,
      name,
    });
    return result;
  };

  const signOut = async () => {
    const result = await authClient.signOut();
    return result;
  };

  const getSession = async () => {
    const result = await authClient.getSession();
    return result;
  };

  return {
    signIn,
    signUp,
    signOut,
    getSession,
  };
};