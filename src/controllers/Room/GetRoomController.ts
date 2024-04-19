import { Request, Response } from 'express';
import { GetRoomService } from '../../services/Room/GetRoomService';

class GetRoomController {
    async handle(req: Request, res: Response) {

        let { room_id } = req.params

        const getRoomService = new GetRoomService

        const room = await getRoomService.execute({
            room_id
        })

        return res.json(room)
    }
}

export { GetRoomController }