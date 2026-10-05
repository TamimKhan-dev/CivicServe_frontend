import { z } from "zod";

export const TITLE_MAX = 100;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

export const createRequestSchema = z
  .object({
    type: z.enum(["COMPLAINT_REQUEST", "SERVICE_REQUEST"]),

    title: z
      .string()
      .trim()
      .min(5, "Title must be at least 5 characters")
      .max(TITLE_MAX, `Title cannot exceed ${TITLE_MAX} characters`),

    categoryId: z.string().min(1, "Please select a category"),

    departmentId: z.string().min(1, "Select a category to set the department"),

    serviceId: z.string().optional(),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(2000, "Description cannot exceed 2000 characters"),

    location: z
      .string()
      .trim()
      .min(3, "Location must be at least 3 characters")
      .max(200, "Location cannot exceed 200 characters"),

    image: z
      .instanceof(File)
      .refine(
        (f) => IMAGE_TYPES.includes(f.type),
        "Use a JPG, PNG or WebP image",
      )
      .refine((f) => f.size <= MAX_IMAGE_SIZE, "Image must be 3 MB or smaller")
      .nullable()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "SERVICE_REQUEST" && !data.serviceId) {
      ctx.addIssue({
        code: "custom",
        path: ["serviceId"],
        message: "Please select a service",
      });
    }
  });

export type CreateRequestValues = z.infer<typeof createRequestSchema>;
