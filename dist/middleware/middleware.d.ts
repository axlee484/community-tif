import { NextFunction, Request, Response } from "express";
export interface UserRequest extends Request {
    user: {
        email: string;
        id: string;
    };
}
export declare const authorizeByUserId: (req: UserRequest, res: Response, next: NextFunction) => Promise<void>;
