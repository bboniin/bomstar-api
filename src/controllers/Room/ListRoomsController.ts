import { Request, Response } from 'express';
import { ListRoomsService } from '../../services/Room/ListRoomsService';

class ListRoomsController {
    async handle(req: Request, res: Response) {

        const { page, all } = req.query

        const listRoomsService = new ListRoomsService

        const rooms = await listRoomsService.execute({
            page: Number(page) > 0 ? Number(page) : 0, all: all == "true"
        })

        return res.json(rooms)
    }
}

export { ListRoomsController }