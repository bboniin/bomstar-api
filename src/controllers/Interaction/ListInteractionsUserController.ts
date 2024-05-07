import { Request, Response } from 'express';
import { ListInteractionsUserService } from '../../services/Interaction/ListInteractionsUserService';

class ListInteractionsUserController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        let user_id = req.userId

        const listInteractionsUserService = new ListInteractionsUserService

        const interactionsUser = await listInteractionsUserService.execute({
            user_id: user_id, page: Number(page) > 0 ? Number(page) : 0
        })

        interactionsUser.interactions.map((item) => {
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

        return res.json(interactionsUser)
    }
}

export { ListInteractionsUserController }