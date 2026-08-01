import * as z from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Minumum length of name should be 3")
    .max(30, "Maximum length of name should be 30"),

  age: z
    .number()
    .min(10, "Minium age should be 10")
    .max(100, "Maximum age should be 100")
    .optional(),

  email: z.preprocess(
    (value) =>
      typeof value == "string" ? value.trim().toLocaleLowerCase() : "",
    z.email("Email must be valid"),
  ),

  password: z
    .string()
    .min(8)
    .max(30)
    .regex(/[A-Z]/, "your password should have atleat one upper letter")
    .regex(/[a-z]/, "your password should have atleat one lower letter")
    .regex(/[0-9]/, "your password should have atleat 1 Number")
    .regex(
      /[@$%#!*^<>?"{}:]/,
      "your password should have atleat one special character",
    ),
});

export const loginSchema = z.object({
  email: z.preprocess(
    (value) =>
      typeof value == "string" ? value.trim().toLocaleLowerCase() : "",
    z.email("Email must be valid"),
  ),
  password: z
    .string()
    .min(8)
    .max(30)
    .regex(/[A-Z]/, "your password should have atleat one upper letter")
    .regex(/[a-z]/, "your password should have atleat one lower letter")
    .regex(/[0-9]/, "your password should have atleat 1 Number")
    .regex(
      /[@$%#!*^<>?"{}:]/,
      "your password should have atleat one special character",
    ),
});
