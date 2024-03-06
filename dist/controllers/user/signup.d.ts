import { Request, Response } from "express";
export type SignupRequest = {
    name: string;
    email: string;
    password: string;
};
declare const signup: (req: Request, res: Response) => Promise<void>;
export default signup;
