import { Request, Response } from 'express';
import { RankingRoomService } from '../../services/Room/RankingRoomService';

class RankingRoomController {
    async handle(req: Request, res: Response) {

        const { room_id } = req.params

        const rankingRoomService = new RankingRoomService

        const users = await rankingRoomService.execute({
            room_id
        })

        users.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
        })

        return res.json(users)
    }
}

export { RankingRoomController }