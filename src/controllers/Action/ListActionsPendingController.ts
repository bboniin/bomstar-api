import { Request, Response } from 'express';
import { ListActionsPendingService } from '../../services/Action/ListActionsPendingService';

class ListActionsPendingController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listActionsPendingService = new ListActionsPendingService

        const actionsPending = await listActionsPendingService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        return res.json(actionsPending)
    }
}

export { ListActionsPendingController }