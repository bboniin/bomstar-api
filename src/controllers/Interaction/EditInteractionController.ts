import { Request, Response } from 'express';
import { EditInteractionService } from '../../services/Interaction/EditInteractionService';

class EditInteractionController {
    async handle(req: Request, res: Response) {
        const { name, description, reward } = req.body

        const { interaction_id } = req.params

        const editInteractionService = new EditInteractionService

        const interaction = await editInteractionService.execute({
            name, description, reward, interaction_id
        })

        return res.json(interaction)
    }
}

export { EditInteractionController }