import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().max(20, "Username must be at most 20 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be at most 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passion: z.array(z.string()).max(4),
  country: z.string().max(40, "Country must be at most 40 characters"),
});

export type RegisterModel = z.infer<typeof registerSchema>;
