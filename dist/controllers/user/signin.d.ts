import { Request, Response } from "express";
export type SignInBody = {
    email: string;
    password: string;
};
declare const signin: (req: Request, res: Response) => Promise<void>;
export default signin;
