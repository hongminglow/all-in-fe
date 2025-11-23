import { apiData } from "~/lib/ky";
import type { TUserDetails } from "~/types/user";

export type TSignUpUserRequest = {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export const signUpUser = (body: TSignUpUserRequest) => {
  return apiData<TUserDetails>("register", {
    method: "post",
    json: body,
  });
};
