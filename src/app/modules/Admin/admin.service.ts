import { query } from "express";
import { PrismaClient } from "@prisma/client";
import { adminQueryData } from "../utils/constants";

const prisma = new PrismaClient();
const getAllAdmin = async (queries: any) => {
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
  if (conditions.length > 0) {
    result = await prisma.admin.findMany({
      where: {
        OR: conditions,
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
  } else if ((page && limit) !== undefined) {
    result = await prisma.admin.findMany({
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
    result = await prisma.admin.findMany({});
  }

  return result;
};

export const adminServices = {
  getAllAdmin,
};
