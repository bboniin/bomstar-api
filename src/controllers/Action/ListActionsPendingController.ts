import { Request, Response } from 'express';
import { ListActionsPendingService } from '../../services/Action/ListActionsPendingService';

class ListActionsPendingController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listActionsPendingService = new ListActionsPendingService

        const actionsPending = await listActionsPendingService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        actionsPending.actions.map((item) => {
            if (item.user["photo"]) {
                item.user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user["photo"];
            }
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(actionsPending)
    }
}

export { ListActionsPendingController }