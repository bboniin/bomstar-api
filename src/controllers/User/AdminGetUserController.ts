import { Request, Response } from 'express';
import { AdminGetUserService } from '../../services/User/AdminGetUserService';

class AdminGetUserController {
    async handle(req: Request, res: Response) {

        const { user_id } = req.params

        const getUserService = new AdminGetUserService

        const user = await getUserService.execute({
            user_id: String(user_id)
        })

        if (user["photo"]) {
            user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }

        return res.json(user)
    }
}

export { AdminGetUserController }