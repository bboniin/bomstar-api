import { Request, Response } from 'express';
import { AdminEditUserService } from '../../services/User/AdminEditUserService';

class AdminEditUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, observation, room_id, birthday } = req.body

        const { user_id } = req.params
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editUserService = new AdminEditUserService

        const user = await editUserService.execute({
            name, email, phone_number, observation, room_id, photo, birthday, user_id
        })

        if (user["photo"]) {
            user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }

        return res.json(user)
    }
}

export { AdminEditUserController }