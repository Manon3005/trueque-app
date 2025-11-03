import { Request, Response } from 'express';
import { JsonResponse } from '../models/json-response';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, LoginUserDto, UpdateIsSuspendedDto, UpdateUserDto } from '../dto/user.dto';
import bcrypt from 'bcrypt'
import { Role, Prisma } from '../generated/prisma';
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from '../models/authenticated-request';
import { toBase64 } from '../utils/image';

async function create(req: Request, res: Response) {
  try {
    const body = req.body as CreateUserDto;

    const saltRounds = 2;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    
    const user = await UserRepository.create(body.rut, body.email, body.username, passwordHash, body.region, body.city, Role.USER);
    const result: JsonResponse = {
        code: 200,
        message: "User created successfully.",
        data: {
          userId: user.id
        }
    }
    res.status(200).json(result);
  } catch (error) {
    
    console.error("fallo el registro!!", error);

    let message;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      message = "Error in creating user: user with the same " + error.meta!.target + " already exists.";
    } else {
      message = "Error in creating user."
    }
    const result: JsonResponse = {
      code: 500,
      message: message,
      data: null
    }
    res.status(500).json(result);
  }
};

async function login(req: Request, res: Response) {
  try {
    const body = req.body as LoginUserDto;
    
    const user = await UserRepository.getByEmail(body.email);
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "Authentication failed.",
        data: null
      });
    }
    const passwordMatch = await bcrypt.compare(body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        code: 401,
        message: "Authentication failed.",
        data: null
      });
    }

    if (user.is_suspended) {
      return res.status(403).json({
        code: 403,
        message: "User suspended.",
        data: null
      });
    }

    const token = jwt.sign({ 
        userId: user.id,
        role: user.role 
      }, 
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1h" }
    );
    const result: JsonResponse = {
        code: 200,
        message: "User authenticated successfully.",
        data: {
          token: token
        }
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 500,
      message: "Internal server error.",
      data: null
    }
    res.status(500).json(result);
  }
};


async function update(req: AuthenticatedRequest, res: Response) {
  try {
    const body = req.body as UpdateUserDto;
  
    await UserRepository.update(req.userId!, body.email, body.username, body.region, body.city);
    const result: JsonResponse = {
        code: 200,
        message: "User updated successfully.",
        data: null
    }
    res.status(200).json(result);
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
    const result: JsonResponse = {
      code: 400,
      message: message,
      data: null
    }
    res.status(400).json(result);
  }
};

async function getAll(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string);
    const pageSize = parseInt(req.query.pageSize as string);
    const users = await UserRepository.getAll(page, pageSize)
    const amount = await UserRepository.count();

    const result: JsonResponse = {
      code: 200,
      message: "Users sent successfully.",
      data: {
        users: users,
        totalPage: pageSize != 0? Math.ceil(amount / pageSize): 0
      }
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting users.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function updateIsSuspended(req: Request, res: Response) {
  try {
    const body = req.body as UpdateIsSuspendedDto;
    await UserRepository.updateIsSuspended(parseInt(req.params.id), body.is_suspended);
    const result: JsonResponse = {
      code: 200,
      message: "User updated successfully.",
      data: null
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in updating user.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function remove(req: AuthenticatedRequest, res: Response) {
  try {
    const product = await UserRepository.remove(req.userId!);
    const result: JsonResponse = {
      code: 200,
      message: "User deleted successfully.",
      data: product
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in deleting user.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function updatePicture(req: AuthenticatedRequest, res: Response) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        code: 400,
        message: "No image received.",
        data: null
      });
    }
    await UserRepository.updatePicture(req.userId!, file.buffer, file.mimetype);
    const result: JsonResponse = {
      code: 200,
      message: "User updated successfully.",
      data: null
    }
    res.status(200).json(result);
  } catch (err: any) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in updating user.",
      data: null
    }
    res.status(400).json(result);
  }
}

async function get(req: AuthenticatedRequest, res: Response) {
  try {
    const user = await UserRepository.getById(req.userId!);

    const base64 = toBase64(user!.picture);
    const dataUrl = base64 ? `data:${user!.pictureMime ?? "image/png"};base64,${base64}` : null;

    const result: JsonResponse = {
      code: 200,
      message: "User sent successfully.",
      data: {
        ...user,
        picture: dataUrl
      }
    }
    res.status(200).json(result);
  } catch (error) {
    const result: JsonResponse = {
      code: 400,
      message: "Error in getting user.",
      data: null
    }
    res.status(400).json(result);
  }
}

export const UserController = {
  create,
  update,
  getAll,
  updateIsSuspended,
  login,
  remove,
  updatePicture,
  get
}