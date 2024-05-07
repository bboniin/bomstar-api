import { Request, Response } from 'express';
import { CreateBonusService } from '../../services/BonusAndPenalty/CreateBonusService';

class CreateBonusController {
    async handle(req: Request, res: Response) {
        const { name, user_id, value, description } = req.body
        
        const createBonusService = new CreateBonusService

        const interaction = await createBonusService.execute({
            name, user_id, value: value ? parseInt(value) : 0, description
        })

        return res.json(interaction)
    }
}

export { CreateBonusController }