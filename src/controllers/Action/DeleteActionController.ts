import { Request, Response } from 'express';
import { DeleteActionService } from '../../services/Action/DeleteActionService';

class DeleteActionController {
    async handle(req: Request, res: Response) {

        const { action_id } = req.params

        const deleteActionService = new DeleteActionService

        const action = await deleteActionService.execute({
            action_id
        })

        return res.json(action)
    }
}

export { DeleteActionController }