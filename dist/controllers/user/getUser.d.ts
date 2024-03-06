import { Request, Response } from "express";
export type JwtPayload = {
    id: string;
    email: string;
    iat: number;
};
declare const getUser: (req: Request, res: Response) => Promise<void>;
export default getUser;
