import { Request, Response } from 'express';
import { EditActionService } from '../../services/Action/EditActionService';

class EditActionController {
    async handle(req: Request, res: Response) {
        const { name, description, reward } = req.body

        const { action_id } = req.params

        const editActionService = new EditActionService

        const action = await editActionService.execute({
            name, description, reward, action_id
        })

        return res.json(action)
    }
}

export { EditActionController }