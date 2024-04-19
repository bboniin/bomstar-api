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

        return res.json(actionsUser)
    }
}

export { ListActionsUserController }