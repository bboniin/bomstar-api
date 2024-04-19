import { Request, Response } from 'express';
import { EditPasswordUserService } from '../../services/User/EditPasswordUserService';

class EditPasswordUserController {
    async handle(req: Request, res: Response) {

        const { new_password, old_password } = req.body

        let user_id = req.userId

        const editPasswordUserService = new EditPasswordUserService

        const user = await editPasswordUserService.execute({
            new_password, old_password, user_id
        })

        return res.json(user)
    }
}

export { EditPasswordUserController }