import { Gender } from "@prisma/client";
import { z } from "zod";

export const adminQueryData = ["name", "email", "contactNumber"];

export const adminUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

export const createAdminSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
  }),
});


export const createDoctorSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    address: z.string(),
    registrationNumber: z.string(),
    experience: z.number(),
    gender : z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee : z.number(),
    qualification : z.string(),
    currentWorkingPlace : z.string(),
    designation : z.string(),
  }),
});

