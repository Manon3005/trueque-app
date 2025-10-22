import { Request, Response } from 'express';
import { jsonResponse } from '../models/json-response';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateIsSuspendedDto, UpdateUserDto } from '../dto/user.dto';
import bcrypt from 'bcrypt'
import { Role, Prisma } from '../generated/prisma';

async function create(req: Request, res: Response) {
  try {
    const body = req.body as CreateUserDto;

    const saltRounds = 2;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    const user = await UserRepository.create(body.rut, body.email, body.username, passwordHash, body.region, body.city, Role.USER);
    const result: jsonResponse = {
        code: 200,
        message: "User created successfully.",
        data: {
          userId: user.id
        }
    }
    res.json(result);
  } catch (error) {
    let message;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      message = "Error in creating user: user with the same " + error.meta!.target + " already exists.";
    } else {
      message = "Error in creating user."
    }
    const result: jsonResponse = {
      code: 400,
      message: message,
      data: null
    }
    res.json(result);
  }
};

async function update(req: Request, res: Response) {
  try {
    const body = req.body as UpdateUserDto;

    const saltRounds = 2;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    await UserRepository.update(parseInt(req.params.id), body.email, body.username, passwordHash, body.region, body.city);
    const result: jsonResponse = {
        code: 200,
        message: "User updated successfully.",
        data: null
    }
    res.json(result);
  } catch (error) {
    let message;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.meta!.target != undefined) {
        message = "Error in updating user: user with the same " + error.meta!.target + " already exists.";
      } else {
        message = "Error in updating user: user not found.";
      }
    } else {
      message = "Error in updating user."
    }
    const result: jsonResponse = {
      code: 400,
      message: message,
      data: null
    }
    res.json(result);
  }
};

async function getAll(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);
    const users = await UserRepository.getAll(page, pageSize)
    const amount = await UserRepository.count();

    const result: jsonResponse = {
      code: 200,
      message: "Users sent successfully.",
      data: {
        users: users,
        totalPage: pageSize != 0? Math.ceil(amount / pageSize): 0
      }
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in getting users.",
      data: null
    }
    res.json(result);
  }
}

async function updateIsSuspended(req: Request, res: Response) {
  try {
    const body = req.body as UpdateIsSuspendedDto;
    await UserRepository.updateIsSuspended(parseInt(req.params.id), body.is_suspended);
    const result: jsonResponse = {
      code: 200,
      message: "User updated successfully.",
      data: null
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
      code: 400,
      message: "Error in updating user.",
      data: null
    }
    res.json(result);
  }
}

export const UserController = {
  create,
  update,
  getAll,
  updateIsSuspended
}