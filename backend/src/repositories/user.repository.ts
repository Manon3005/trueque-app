import { prisma } from "../config/db";
import { User, Role } from "../generated/prisma";

async function getByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function create(rut: string, email: string, username: string, password: string, region: string, city: string, role: Role): Promise<User | null>   {
  return await prisma.user.create({
    data: {
      rut: rut,
      email: email,
      username: username,
      password: password,
      region: region,
      city: city,
      role: role
    },
  });
}

export const UserRepository = {
    getByEmail,
    create
}