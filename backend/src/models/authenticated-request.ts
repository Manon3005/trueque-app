import { Request } from "express";
import { Role } from "../generated/prisma";

export interface AuthenticatedRequest extends Request {
  userId?: number,
  role?: Role
}