import { Request, Response } from 'express';
import { ListInteractionsRoomService } from '../../services/Interaction/ListInteractionsRoomService';

class ListInteractionsRoomController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const { room_id } = req.params

        const listInteractionsRoomService = new ListInteractionsRoomService

        const interactionsRoom = await listInteractionsRoomService.execute({
            room_id: room_id, page: Number(page) > 0 ? Number(page) : 0
        })

        return res.json(interactionsRoom)
    }
}

export { ListInteractionsRoomController }