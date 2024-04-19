import { Request, Response } from 'express';
import { ListUsersPendingService } from '../../services/User/ListUsersPendingService';

class ListUsersPendingController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listUsersPendingService = new ListUsersPendingService

        const users = await listUsersPendingService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        users.users.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(users)
    }
}

export { ListUsersPendingController }