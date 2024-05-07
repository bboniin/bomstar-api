import { Request, Response } from 'express';
import { DeleteInteractionService } from '../../services/Interaction/DeleteInteractionService';

class DeleteInteractionController {
    async handle(req: Request, res: Response) {

        const { interaction_id } = req.params

        const deleteInteractionService = new DeleteInteractionService

        const interaction = await deleteInteractionService.execute({
            interaction_id
        })

        return res.json(interaction)
    }
}

export { DeleteInteractionController }