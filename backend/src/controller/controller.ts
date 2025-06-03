import { Request, Response, NextFunction } from "express";
import { IController } from "../interface/IController";
import { IService } from "../interface/IService";
import { HttpStatus } from "../constants/httpStatus";
import { Messages } from "../constants/messages";

export class Controller implements IController {
    constructor(private _service: IService) { }
    
    async uploadImage(req: Request, res: Response): Promise<void> {
        const { front, back } = req.files as {
            [feildName: string]: Express.Multer.File[]
        }

        if (!front || !back) {
            res.status(HttpStatus.BAD_REQUEST).send(Messages.IMAGE_REQUIRED)
        }

        try {
            const data = await this._service.extractData(
                front[0].buffer,
                back[0].buffer
            )
            console.log('processed data from service :', data);
            res.json(data)
        } catch (error: any) {
            const message = error instanceof Error ? error.message : Messages.OCR_FAILED
            res.status(400).json({ error: message });
        }
    };
}