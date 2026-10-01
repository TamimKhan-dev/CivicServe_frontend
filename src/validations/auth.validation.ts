import z from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z
    .string()
    .min(5, "Password Must Minimum 5 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number"),
});
