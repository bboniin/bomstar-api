import { Request, Response } from 'express';
import { ListProductsService } from '../../services/Product/ListProductsService';

class ListProductsController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        let user_id = req.userId

        const listProductsService = new ListProductsService

        const product = await listProductsService.execute({
            page: Number(page) > 0 ? Number(page) : 0, user_id
        })

        product.products.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })
        
        return res.json(product)
    }
}

export { ListProductsController }