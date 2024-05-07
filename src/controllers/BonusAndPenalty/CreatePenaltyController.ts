import { Request, Response } from 'express';
import { CreatePenaltyService } from '../../services/BonusAndPenalty/CreatePenaltyService';

class CreatePenaltyController {
    async handle(req: Request, res: Response) {
        const { name, user_id, value, description } = req.body
        
        const createPenaltyService = new CreatePenaltyService

        const interaction = await createPenaltyService.execute({
            name, user_id, value: value ? parseInt(value) : 0, description
        })

        return res.json(interaction)
    }
}

export { CreatePenaltyController }