import { Request, Response } from 'express';
import { ListRoomsService } from '../../services/Room/ListRoomsService';

class ListRoomsController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listRoomsService = new ListRoomsService

        const rooms = await listRoomsService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        return res.json(rooms)
    }
}

export { ListRoomsController }