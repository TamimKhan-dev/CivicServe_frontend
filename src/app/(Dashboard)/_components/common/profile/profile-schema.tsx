import { z } from "zod";

const MAX_SIZE = 2 * 1024 * 1024;
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{7,20}$/, "Enter a valid phone number")
    .or(z.literal("")),
  image: z
    .instanceof(File)
    .refine((f) => IMAGE_TYPES.includes(f.type), "Only JPG, PNG or WebP")
    .refine((f) => f.size <= MAX_SIZE, "Image must be under 2MB")
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
