import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user'
import { jsonResponse } from '../models/json-response';

let users: User[] = [
    {
        id: 0,
        RUT: "12345678-0",
        email: "user@mail.com",
        username: "MyUser",
        passwordHash: "ienucifouoqu8NDjidej",
        region: "Valparaiso",
        city: "Vina del Mar"
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