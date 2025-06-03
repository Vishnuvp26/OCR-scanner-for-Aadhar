import { Controller } from "../controller/controller";
import { Service } from "../service/service";

export function createDependencies() {
    const ocrService = new Service()
    const ocrController = new Controller(ocrService)

    return {
        ocrController
    }
}