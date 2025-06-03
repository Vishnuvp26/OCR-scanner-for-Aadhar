import { Request, Response, NextFunction } from "express";

export interface IController {
    uploadImage(req: Request, res: Response): Promise<void>;
}