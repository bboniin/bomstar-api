import { Request, Response } from 'express';
import { EditRoomService } from '../../services/Room/EditRoomService';

class EditRoomController {
    async handle(req: Request, res: Response) {
        const { name, observation, is_social } = req.body

        const { room_id } = req.params

        const editRoomService = new EditRoomService

        const room = await editRoomService.execute({
            name, observation, is_social, room_id
        })

        return res.json(room)
    }
}

export { EditRoomController }