import { Request, Response } from 'express';
import { GetRoomService } from '../../services/Room/GetRoomService';

class GetRoomController {
    async handle(req: Request, res: Response) {

        let { room_id } = req.params

        const getRoomService = new GetRoomService

        const room = await getRoomService.execute({
            room_id
        })

        room.users.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })
        
        return res.json(room)
    }
}

export { GetRoomController }