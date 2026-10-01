import z from "zod";

const MAX_PHOTO_SIZE = 3 * 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z
    .string()
    .min(5, "Password Must Minimum 5 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")
    .regex(/[0-9]/, "Password must contain atleast 1 Number"),
});

export const registerSchema = z
  .object({
    photo: z
      .instanceof(File)
      .refine(
        (f) => PHOTO_TYPES.includes(f.type),
        "Use a JPG, PNG or WebP image",
      )
      .refine((f) => f.size <= MAX_PHOTO_SIZE, "Image must be 3MB or smaller")
      .nullable()
      .optional(),
    fullName: z.string().trim().min(2, "Enter your full name"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .min(7, "Enter a valid phone number")
      .regex(/^[+\d\s()-]+$/, "Enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/\d/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
