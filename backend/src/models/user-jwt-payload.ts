import { JwtPayload } from "jsonwebtoken";
import { Role } from "../generated/prisma";

export interface UserJwtPayload extends JwtPayload {
  userId: number,
  role: Role,
  iat: number,
  exp: number
}