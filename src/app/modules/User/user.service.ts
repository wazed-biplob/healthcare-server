import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { uploadToCloudinary } from "../utils/cloudinary";

const prisma = new PrismaClient();

const createAdmin = async (req: any) => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  const file = req.file;

  if (file) {
    const uploadCloudinary: any = await uploadToCloudinary(file);
    console.log("upload", uploadCloudinary);
    req.body.admin.profilePhoto = uploadCloudinary?.secure_url;
  }

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    const createUserData = await tx.user.create({
      data: userData,
    });

    const createAdminData = await tx.admin.create({
      data: req.body.admin,
    });

    return createAdminData;
  });
  return result;
};

export const userService = {
  createAdmin,
};
