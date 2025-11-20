import { z } from "zod";

export const createLoginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username characters must be less than 20"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(18, "Password characters must be less than 18"),
});

export const createSignUpSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username characters must be less than 20"),
    email: z.email("Invalid email address format"),
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .max(12, "Phone number must be less than 12 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(18, "Password characters must be less than 18"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type TLoginSchema = z.infer<typeof createLoginSchema>;
export type TSignUpSchema = z.infer<typeof createSignUpSchema>;
