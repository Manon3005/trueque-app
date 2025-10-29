import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { UserJwtPayload } from '../models/user-jwt-payload';
import { AuthenticatedRequest } from '../models/authenticated-request';

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(403).json({
                code: 403,
                message: "Access denied.",
                data: null
            });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                code: 401,
                message: "Invalid token format.",
                data: null
            });
        }
        const token = authHeader.replace(/^Bearer\s+/, '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as UserJwtPayload;
        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({
            code: 401,
            message: "Invalid token.",
            data: null
        });
    }
};