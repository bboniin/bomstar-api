import { Request, Response } from 'express';
import { CreateInteractionService } from '../../services/Interaction/CreateInteractionService';

class CreateInteractionController {
    async handle(req: Request, res: Response) {
        const { name, room_id, reward, description } = req.body
        
        const createInteractionService = new CreateInteractionService

        const interaction = await createInteractionService.execute({
            name, room_id, reward: reward ? parseInt(reward) : 0, description
        })

        return res.json(interaction)
    }
}

export { CreateInteractionController }