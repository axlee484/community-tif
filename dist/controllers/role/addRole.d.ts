import { Request, Response } from "express";
export declare const Roles: {
    ADMIN: string;
    MEMBER: string;
    MODERATOR: string;
};
declare const addRole: (req: Request, res: Response) => Promise<void>;
export default addRole;
