import { Request, Response } from 'express';
import { UpdateStatusActionService } from '../../services/Action/UpdateStatusActionService';

class UpdateStatusActionController {
    async handle(req: Request, res: Response) {
        const { response, status } = req.body

        const { action_id } = req.params

        const updateStatusActionService = new UpdateStatusActionService

        const action = await updateStatusActionService.execute({
            response, action_id, status
        })

        return res.json(action)
    }
}

export { UpdateStatusActionController }