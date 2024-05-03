import { Request, Response } from 'express';
import { ListActionsUserService } from '../../services/Action/ListActionsUserService';

class ListActionsUserController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        let user_id = req.userId

        const listActionsUserService = new ListActionsUserService

        const actionsUser = await listActionsUserService.execute({
            user_id: user_id, page: Number(page) > 0 ? Number(page) : 0
        })

        actionsUser.actions.map((item) => {
            if (item.user["photo"]) {
                item.user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user["photo"];
            }
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(actionsUser)
    }
}

export { ListActionsUserController }