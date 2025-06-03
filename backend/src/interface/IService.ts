export interface IService {
    processImage(imageBuffer: Buffer): Promise<any>;
    extractData(frontBuffer: Buffer, backBuffer: Buffer): Promise<any>;
}