import { apiData } from "~/lib/ky";
import type { TUserDetails } from "~/types/user";

export type TAuthenticateUserRequest = {
  identifier: string;
  password: string;
};

export type TAuthenticateUserResponse = {
  token: string;
  user: TUserDetails;
};

export const authenticateUser = (body: TAuthenticateUserRequest) => {
  return apiData<TAuthenticateUserResponse>("login", {
    method: "post",
    json: body,
  });
};
