import { Request, Response } from 'express';
import { UserTransferPointsService } from '../../services/User/UserTransferPointsService';

class UserTransferPointsController {
    async handle(req: Request, res: Response) {
        const { value } = req.body

        const { user_id } = req.params

        let user_send_id = req.userId

        const userTransferPointsService = new UserTransferPointsService

        const interaction = await userTransferPointsService.execute({
            user_receive_id: user_id, user_id: user_send_id, value: value ? parseInt(value) : 0,
        })

        return res.json(interaction)
    }
}

export { UserTransferPointsController }