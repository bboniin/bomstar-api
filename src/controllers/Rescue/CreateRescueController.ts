import { Request, Response } from 'express';
import { CreateRescueService } from '../../services/Rescue/CreateRescueService';

class CreateRescueController {
    async handle(req: Request, res: Response) {
        
        const { product_id, amount } = req.body
        
        let user_id = req.userId

        const createRescueService = new CreateRescueService

        const rescue = await createRescueService.execute({
            product_id, amount, user_id
        })

        return res.json(rescue)
    }
}

export { CreateRescueController }