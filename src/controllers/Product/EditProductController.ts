import { Request, Response } from 'express';
import { EditProductService } from '../../services/Product/EditProductService';

class EditProductController {
    async handle(req: Request, res: Response) {
        
        const { name, description, amount, value, is_bomstar, is_social } = req.body

        const { product_id } = req.params

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editProductService = new EditProductService

        const product = await editProductService.execute({
            name, description, amount: amount ? parseInt(amount) : 0, value: value ? parseInt(value) : 0, is_bomstar: is_bomstar == "true", is_social: is_social == "true", product_id, photo
        })

        if (product["photo"]) {
            product["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + product["photo"];
        }

        return res.json(product)
    }
}

export { EditProductController }