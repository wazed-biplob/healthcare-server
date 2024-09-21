import { z } from "zod";

export const adminQueryData = ["name", "email", "contactNumber"];
export const adminUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});
