import { Request, Response } from 'express';
import { ListUsersService } from '../../services/User/ListUsersService';

class ListUsersController {
    async handle(req: Request, res: Response) {

        const {page, all} = req.query

        const listUsersService = new ListUsersService

        const users = await listUsersService.execute({
            page: Number(page) > 0 ? Number(page) : 0, all: all == "true"
        })

        users.users.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(users)
    }
}

export { ListUsersController }