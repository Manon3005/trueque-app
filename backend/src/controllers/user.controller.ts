import { Request, Response, NextFunction } from 'express';
import { User, Role } from '../generated/prisma';
import { jsonResponse } from '../models/json-response';

let users: User[] = [
    {
        id: 0,
        rut: "12345678-0",
        email: "user@mail.com",
        username: "MyUser",
        password: "ienucifouoqu8NDjidej",
        region: "Valparaiso",
        city: "Vina del Mar",
        role: Role.ADMIN,
        is_suspended: false
    }
];

export const getAll = (req: Request, res: Response) => {
  try {
    const result: jsonResponse = {
        code: 200,
        message: "Users sent successfully",
        data: users
    }
    res.json(result);
  } catch (error) {
    const result: jsonResponse = {
        code: 400,
        message: "Error in getting Users",
        data: null
    }
    res.json(result);
  }
};