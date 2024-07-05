import { Request, Response } from 'express';
import { CreateMultiBonusService } from '../../services/BonusAndPenalty/CreateMultiBonusService';

class CreateMultiBonusController {
    async handle(req: Request, res: Response) {
        const { name, users, value, description } = req.body
        
        const createMultiBonusService = new CreateMultiBonusService

        const interaction = await createMultiBonusService.execute({
            name, users, value: value ? parseInt(value) : 0, description
        })

        return res.json(interaction)
    }
}

export { CreateMultiBonusController }