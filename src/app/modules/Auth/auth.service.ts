import { PrismaClient, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/functions";

const prisma = new PrismaClient();

const loginUser = async (data: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
      status: UserStatus.ACTIVE,
    },
  });

  const hashedPassword = await bcrypt.compare(data.password, userData.password);

  if (!hashedPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcde",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdef",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken: string) => {
  let decodedData;
  try {
    decodedData = verifyToken(refreshToken, "abcdef");
  } catch (e) {
    throw new Error("You are not authorised");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcde",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );
  return {
    accessToken,
    needsPasswordChange: userData.needsPasswordChange,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
