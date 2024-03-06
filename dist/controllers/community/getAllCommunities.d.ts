import { Request, Response } from "express";
export type PaginationMetaData = {
    total: number;
    pages: number;
    page: number;
};
declare const getAllCommunities: (_req: Request, res: Response) => Promise<void>;
export default getAllCommunities;
