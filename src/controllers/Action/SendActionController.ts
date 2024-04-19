import { Request, Response } from 'express';
import { SendActionService } from '../../services/Action/SendActionService';

class SendActionController {
    async handle(req: Request, res: Response) {
        const { action_id, observation } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let user_id = req.userId

        const sendActionService = new SendActionService

        const user = await sendActionService.execute({
            action_id, user_id, observation, image: photo
        })

        return res.json(user)
    }
}

export { SendActionController }