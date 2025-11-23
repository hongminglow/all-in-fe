export type TApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};
