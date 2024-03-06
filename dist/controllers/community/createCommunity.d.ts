import { Request, Response } from "express";
export type CreateCommunityRequest = {
    name: string;
};
declare const createCommunity: (req: Request, res: Response) => Promise<void>;
export default createCommunity;
