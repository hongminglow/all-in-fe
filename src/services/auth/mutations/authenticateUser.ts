import { serverApi } from "~/lib/ky";

export type TAuthenticateUserRequest = {
  identifier: string;
  password: string;
};

type TAuthenticateUserResponse = {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    phone: string;
    created_at: string;
  };
};

export const authenticateUser = (body: TAuthenticateUserRequest) => {
  console.log("body request...", JSON.stringify(body, null, 2));
  return serverApi
    .post("login", {
      json: body,
    })
    .json<TAuthenticateUserResponse>();
};
