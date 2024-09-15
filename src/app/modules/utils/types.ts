import { ParsedQs } from "qs";
export type Admin = {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string;
  isDeleted: boolean | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Meta = {
  page: any;
  limit: any;
};

export type AllAdmin = {
  meta: Meta;
  data: Admin[];
};

export type QueryParams = {
  [key: string]: string | string[] | ParsedQs | ParsedQs[] | undefined;
};

export interface ResponseResult<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
