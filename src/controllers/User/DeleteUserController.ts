import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/User/DeleteUserService';

class DeleteUserController {
    async handle(req: Request, res: Response) {

        const { user_id } = req.params
        const { password } = req.query

        const deleteUserService = new DeleteUserService

        const user = await deleteUserService.execute({
            user_id, password: String(password)
        })

        return res.json(user)
    }
}

export { DeleteUserController }