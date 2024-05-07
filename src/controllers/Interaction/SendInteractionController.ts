import { Request, Response } from 'express';
import { SendInteractionService } from '../../services/Interaction/SendInteractionService';

class SendInteractionController {
    async handle(req: Request, res: Response) {
        const { interaction_id, observation, user_receive_id } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let user_id = req.userId

        const sendInteractionService = new SendInteractionService

        const interaction = await sendInteractionService.execute({
            interaction_id, user_id, observation, photo, user_receive_id: user_receive_id
        })

        return res.json(interaction)
    }
}

export { SendInteractionController }