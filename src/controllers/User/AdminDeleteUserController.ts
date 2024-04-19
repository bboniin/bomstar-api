import { Request, Response } from 'express';
import { AdminDeleteUserService } from '../../services/User/AdminDeleteUserService';

class AdminDeleteUserController {
    async handle(req: Request, res: Response) {

        const { user_id } = req.params

        const deleteUserService = new AdminDeleteUserService

        const user = await deleteUserService.execute({
            user_id
        })

        return res.json(user)
    }
}

export { AdminDeleteUserController }