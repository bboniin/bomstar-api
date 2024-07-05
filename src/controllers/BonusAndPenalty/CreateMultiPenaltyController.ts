import { Request, Response } from 'express';
import { CreateMultiPenaltyService } from '../../services/BonusAndPenalty/CreateMultiPenaltyService';

class CreateMultiPenaltyController {
    async handle(req: Request, res: Response) {
        const { name, users, value, description } = req.body
        
        const createMultiPenaltyService = new CreateMultiPenaltyService

        const interaction = await createMultiPenaltyService.execute({
            name, users, value: value ? parseInt(value) : 0, description
        })

        return res.json(interaction)
    }
}

export { CreateMultiPenaltyController }