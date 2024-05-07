import { Request, Response } from 'express';
import { LastedInteractionUserService } from '../../services/Interaction/LastedInteractionUserService';

class LastedInteractionUserController {
    async handle(req: Request, res: Response) {

        let user_id = req.userId

        const lastedInteractionUserService = new LastedInteractionUserService

        const interaction = await lastedInteractionUserService.execute({
            user_id
        })

        return res.json(interaction)
    }
}

export { LastedInteractionUserController }