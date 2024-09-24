import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/functions";
import config from "../config";
import { nodeMailerSender } from "../utils/nodeMailer";
import { AppError } from "../utils/class";

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
    config.jwt.jwt_secret as string,
    {
      algorithm: "HS256",
      expiresIn: config.jwt.jwt_expires_in,
    }
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as string,
    {
      algorithm: "HS256",
      expiresIn: config.jwt.refresh_token_expires_in,
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
    decodedData = verifyToken(
      refreshToken,
      config.jwt.refresh_token_secret as string
    );
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
    config.jwt.jwt_secret as string,
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

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const hashedPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!hashedPassword) {
    throw new Error(`Password doesn't match`);
  }
  const newHashedPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: newHashedPassword,
      needsPasswordChange: false,
    },
  });
  return {
    message: "Password Changed!",
  };
};

const forgotPassword = async (payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_password_token as string,
    { expiresIn: config.jwt.reset_password_expires_in }
  );
  const resetPasswordLink =
    config.reset_password_link +
    `?id=${userData.id}&token=${resetPasswordToken}`;

  await nodeMailerSender(userData.email, resetPasswordLink);
};

const resetPassword = async (token: string, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const validateToken = verifyToken(
    token,
    config.jwt.reset_password_token as string
  );
  if (!validateToken) {
    throw new AppError(404, "Session Expired!");
  }
  // hashing and updating
  const hashedPassword = await bcrypt.hash(
    payload.password,
    config.password_hash_key as string
  );
  const result = await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashedPassword,
    },
  });
};

export const authServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
