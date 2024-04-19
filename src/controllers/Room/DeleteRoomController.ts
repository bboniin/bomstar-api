import { Request, Response } from 'express';
import { DeleteRoomService } from '../../services/Room/DeleteRoomService';

class DeleteRoomController {
    async handle(req: Request, res: Response) {

        const { room_id } = req.params

        const deleteRoomService = new DeleteRoomService

        const Room = await deleteRoomService.execute({
            room_id
        })

        return res.json(Room)
    }
}

export { DeleteRoomController }