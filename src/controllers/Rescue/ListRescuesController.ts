import { Request, Response } from 'express';
import { ListRescuesService } from '../../services/Rescue/ListRescuesService';

class ListRescuesController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listRescuesService = new ListRescuesService

        const rescues = await listRescuesService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        rescues.rescues.map((item) => {
            if (item.product["photo"]) {
                item.product["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.product["photo"];
            }
            if (item.user["photo"]) {
                item.user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user["photo"];
            }
        })

        return res.json(rescues)
    }
}

export { ListRescuesController }