import Tesseract from "tesseract.js";
import { IService } from "../interface/IService";
import { extractDetails } from "../utils/extractor";
import { Messages } from "../constants/messages";

export class Service implements IService {
    async processImage(imageBuffer: Buffer): Promise<any> {
        try {
            const result = await Tesseract.recognize(imageBuffer, "eng+hin");
            console.log('Result of tesseract in service', result.data.text);
            const extracted = extractDetails(result.data.text);
            return extracted;
        } catch (error) {
            throw error
        }
    };

    async extractData(frontBuffer: Buffer, backBuffer: Buffer): Promise<any> {
        try {
            const frontText = await this.processImage(frontBuffer);
            if (!frontText.aadhaarNumber) {
                throw new Error(Messages.PROPER_IMAGE)
            }

            const backText = await this.processImage(backBuffer);
            if (!backText.aadhaarNumber) {
                throw new Error(Messages.PROPER_IMAGE)
            }

            return {
                name: frontText.name,
                dob: frontText.dob,
                gender: frontText.gender,
                aadhaarNumber: frontText.aadhaarNumber,
                address: backText.address,
            }
        } catch (error) {
            throw error
        }
    };
};