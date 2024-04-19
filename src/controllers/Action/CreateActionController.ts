import { Request, Response } from 'express';
import { CreateActionService } from '../../services/Action/CreateActionService';

class CreateActionController {
    async handle(req: Request, res: Response) {
        const { name, room_id, reward, description } = req.body
        
        const createActionService = new CreateActionService

        const action = await createActionService.execute({
            name, room_id, reward: reward ? parseInt(reward) : 0, description
        })

        return res.json(action)
    }
}

export { CreateActionController }