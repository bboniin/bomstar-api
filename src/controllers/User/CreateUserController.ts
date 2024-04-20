import { Request, Response } from 'express';
import { CreateUserService } from '../../services/User/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, password, birthday } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const createUserService = new CreateUserService

        const user = await createUserService.execute({
            name, email, password, phone_number, birthday, photo
        })

        if (user["photo"]) {
            user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + user["photo"];
        }

        return res.json(user)
    }
}

export { CreateUserController }