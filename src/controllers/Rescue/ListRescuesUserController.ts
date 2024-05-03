import { Request, Response } from 'express';
import { ListRescuesUserService } from '../../services/Rescue/ListRescuesUserService';

class ListRescuesUserController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        let user_id = req.userId

        const listRescuesUserService = new ListRescuesUserService

        const rescues = await listRescuesUserService.execute({
            page: Number(page) > 0 ? Number(page) : 0, user_id
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

export { ListRescuesUserController }