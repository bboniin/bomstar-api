import { Request, Response } from 'express';
import { ListBonusesUserService } from '../../services/BonusAndPenalty/ListBonusesUserService';

class ListBonusesUserController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        let user_id = req.userId

        const listBonusesUserService = new ListBonusesUserService

        const interactions = await listBonusesUserService.execute({
            user_id: user_id, page: Number(page) > 0 ? Number(page) : 0
        })

        return res.json(interactions)
    }
}

export { ListBonusesUserController }