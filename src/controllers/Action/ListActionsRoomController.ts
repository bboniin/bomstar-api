import { Request, Response } from 'express';
import { ListActionsRoomService } from '../../services/Action/ListActionsRoomService';

class ListActionsRoomController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const { room_id } = req.params

        const listActionsRoomService = new ListActionsRoomService

        const actionsUser = await listActionsRoomService.execute({
            room_id: room_id, page: Number(page) > 0 ? Number(page) : 0
        })

        return res.json(actionsUser)
    }
}

export { ListActionsRoomController }