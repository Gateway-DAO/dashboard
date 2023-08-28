import { apiPublic } from "@/services/protocol/api";
import { SessionToken } from "@/types/user";

import getMe from "./get-me";

export default async function loginEmail (
  email: string,
  code: number
): Promise<SessionToken> {
  try {
    const res = await apiPublic.login_email({
      email,
      code,
    });

    const { error } = (res as any) ?? {};

    if(error) {
      throw new Error(error);
    }

    if (error || !res.loginEmail) {
      throw new Error("Couldn't login");
    }

    const token = res.loginEmail;

    return token;
  } catch (error: any) {
    throw new Error(error);
  }
};
