import { Request, Response } from 'express';
import { RescueTrunkService } from '../../services/Trunk/RescueTrunkService';

class RescueTrunkController {
    async handle(req: Request, res: Response) {

        const user_id  = req.userId

        const { trunk_id } = req.params

        const rescueTrunkService = new RescueTrunkService

        const trunk = await rescueTrunkService.execute({
            user_id, trunk_id
        })

        return res.json(trunk)
    }
}

export { RescueTrunkController }