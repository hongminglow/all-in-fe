import { z } from "zod";

export const labBaseSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email address"),
});

export const createLabSchema = labBaseSchema
  .extend({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(18, "Password characters must be less than 18"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const editLabSchema = labBaseSchema.extend({
  agentId: z.string().min(1, "Agent ID is required"),
});

export const createSchemaDefaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const editSchemaDefaultValues = {
  username: "",
  email: "",
  agentId: "",
};

export type TCreateLabSchema = z.infer<typeof createLabSchema>;
export type TEditLabSchema = z.infer<typeof editLabSchema>;
