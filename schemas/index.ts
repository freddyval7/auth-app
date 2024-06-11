import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address.",
  }),
  password: z.string({
    message: "Password is required.",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required and must be a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
  name: z.string({
    message: "Name is required.",
  }),
});
