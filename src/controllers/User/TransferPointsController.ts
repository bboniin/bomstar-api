import { Request, Response } from 'express';
import { TransferPointsService } from '../../services/User/TransferPointsService';

class TransferPointsController {
    async handle(req: Request, res: Response) {
        const { user_receive_id, user_send_id, value } = req.body

        const transferPointsService = new TransferPointsService

        const interaction = await transferPointsService.execute({
            user_receive_id, user_send_id, value: value ? parseInt(value) : 0,
        })

        return res.json(interaction)
    }
}

export { TransferPointsController }