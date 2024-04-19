import { Request, Response } from 'express';
import { UpdateStatusUserService } from '../../services/User/UpdateStatusUserService';

class UpdateStatusUserController {
    async handle(req: Request, res: Response) {
        const { status, room_id, observation } = req.body

        const { user_id } = req.params

        const updateStatusUserService = new UpdateStatusUserService

        const user = await updateStatusUserService.execute({
            status, user_id, room_id, observation
        })

        if (user["photo"]) {
            user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }

        return res.json(user)
    }
}

export { UpdateStatusUserController }