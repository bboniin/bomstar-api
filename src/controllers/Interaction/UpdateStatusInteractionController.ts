import { Request, Response } from 'express';
import { UpdateStatusInteractionService } from '../../services/Interaction/UpdateStatusInteractionService';

class UpdateStatusInteractionController {
    async handle(req: Request, res: Response) {
        const { response, status } = req.body

        const user_id = req.userId

        const { interaction_id } = req.params

        const updateStatusInteractionService = new UpdateStatusInteractionService

        const interaction = await updateStatusInteractionService.execute({
            response, interaction_id, status, user_id
        })

        return res.json(interaction)
    }
}

export { UpdateStatusInteractionController }