import { Response } from "express";
export declare const createErrorResponse: (res: Response, error: string, status?: number) => void;
export declare const createDataResponse: <TData, TMeta>(res: Response, data: TData, meta?: TMeta | undefined, status?: number) => void;
