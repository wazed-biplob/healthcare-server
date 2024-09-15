import { PrismaClient, UserStatus } from "@prisma/client";
import { adminQueryData } from "../utils/constants";
import { Admin, AllAdmin, QueryParams } from "../utils/types";

const prisma = new PrismaClient();
const getAllAdmin = async (queries: QueryParams): Promise<AllAdmin> => {
  const {
    searchTerm,
    page = 1,
    limit = 10,
    sortBy,
    sortOrder,
    ...filterData
  } = queries;

  let conditions: any = [];
  if (searchTerm !== undefined) {
    conditions.push(
      ...adminQueryData.map((field: any) => ({
        [field]: {
          contains: queries.searchTerm,
          mode: "insensitive",
        },
      }))
    );
  }
  if (filterData !== undefined) {
    conditions.push(
      ...Object.keys(filterData)?.map((key) => ({
        [key]: {
          equals: queries[key],
        },
      }))
    );
  }

  let result;
  if (conditions.length > 0 && typeof sortBy === "string") {
    result = await prisma.admin.findMany({
      where: {
        OR: conditions,
        isDeleted: false,
      },

      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "asc" },
    });
  } else if ((page && limit) !== undefined && typeof sortBy === "string") {
    result = await prisma.admin.findMany({
      where: {
        isDeleted: false,
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),

      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "asc" },
    });
  } else {
    result = await prisma.admin.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  return {
    meta: {
      page,
      limit,
    },
    data: result,
  };
};

const getAdminById = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateAdminById = async (
  id: string,
  data: Partial<Admin>
): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

const deleteAdminById = async (id: string): Promise<Admin> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    const deleteAdminFromAdmin = await tx.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    const deleteAdminFromUser = await tx.user.update({
      where: {
        email: deleteAdminFromAdmin.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });
    return deleteAdminFromAdmin;
  });
  return result;
};

export const adminServices = {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
