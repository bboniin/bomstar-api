import { Request, Response } from 'express';
import { CreateProductService } from '../../services/Product/CreateProductService';

class CreateProductController {
    async handle(req: Request, res: Response) {
        
        const { name, description, amount, value, is_bomstar, is_social } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const createProductService = new CreateProductService

        const product = await createProductService.execute({
            name, description, amount: amount ? parseInt(amount) : 0, value: value ? parseInt(value) : 0, is_bomstar: is_bomstar == "true", is_social: is_social == "true", photo
        })

        return res.json(product)
    }
}

export { CreateProductController }