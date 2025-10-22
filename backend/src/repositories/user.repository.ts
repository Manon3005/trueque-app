import { prisma } from "../config/db";
import { GetAllUserDto } from "../dto/user.dto";
import { User, Role } from "../generated/prisma";

async function getByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: { email }
  });
}

async function create(rut: string, email: string, username: string, password: string, region: string, city: string, role: Role): Promise<User>   {
  return await prisma.user.create({
    data: {
      rut: rut,
      email: email,
      username: username,
      password: password,
      region: region,
      city: city,
      role: role
    }
  });
}

async function update(id: number, email: string, username: string, password: string, region: string, city: string): Promise<User>   {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: email,
      username: username,
      password: password,
      region: region,
      city: city
    }
  })
}

async function updateIsSuspended(id: number, isSuspended: boolean): Promise<User| null> {
  return await prisma.user.update({
    where: {
      id: id
    },
    data: {
      is_suspended: isSuspended
    }
  })
}

async function getAll(page: number, pageSize: number): Promise<GetAllUserDto[] | null> {
  return await prisma.user.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      id: true,
      rut: true,
      email: true,
      username: true,
      is_suspended: true
    }
  })
}

async function count(): Promise<number> {
  return await prisma.user.count();
}

export const UserRepository = {
    getByEmail,
    create,
    update,
    updateIsSuspended,
    getAll,
    count
}