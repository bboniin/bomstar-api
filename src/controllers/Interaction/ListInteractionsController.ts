import { Request, Response } from 'express';
import { ListInteractionsService } from '../../services/Interaction/ListInteractionsService';

class ListInteractionsController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listInteractionsService = new ListInteractionsService

        const interactions = await listInteractionsService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        interactions.interactions.map((item) => {
            if (item.user_receive["photo"]) {
                item.user_receive["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user_receive["photo"];
            }
            if (item.user_send["photo"]) {
                item.user_send["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user_send["photo"];
            }
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(interactions)
    }
}

export { ListInteractionsController }