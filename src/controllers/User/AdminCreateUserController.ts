import { Request, Response } from 'express';
import { AdminCreateUserService } from '../../services/User/AdminCreateUserService';

class AdminCreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, room_id, password, birthday, observation } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const createUserService = new AdminCreateUserService

        const user = await createUserService.execute({
            name, email, password, room_id, phone_number, birthday, photo, observation
        })

        return res.json(user)
    }
}

export { AdminCreateUserController }