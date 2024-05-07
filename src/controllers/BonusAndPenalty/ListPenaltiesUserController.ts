import { Request, Response } from 'express';
import { ListPenaltiesUserService } from '../../services/BonusAndPenalty/ListPenaltiesUserService';

class ListPenaltiesUserController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        let user_id = req.userId

        const listPenaltiesUserService = new ListPenaltiesUserService

        const interactions = await listPenaltiesUserService.execute({
            user_id: user_id, page: Number(page) > 0 ? Number(page) : 0
        })

        return res.json(interactions)
    }
}

export { ListPenaltiesUserController }