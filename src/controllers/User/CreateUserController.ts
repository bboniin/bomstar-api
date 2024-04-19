import { Request, Response } from 'express';
import { CreateUserService } from '../../services/User/CreateUserService';

class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, password, birthday } = req.body
        
        console.log("oasdas")
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const createUserService = new CreateUserService

        const user = await createUserService.execute({
            name, email, password, phone_number, birthday, photo
        })

        return res.json(user)
    }
}

export { CreateUserController }