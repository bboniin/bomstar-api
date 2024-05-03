import { Request, Response } from 'express';
import { SendTrunksService } from '../../services/Trunk/SendTrunksService';

class SendTrunksController {
    async handle(req: Request, res: Response) {
        
        const { name, rewards, description, users } = req.body

        const sendTrunksService = new SendTrunksService

        const trunks = await sendTrunksService.execute({
            name, rewards, description, users
        })

        return res.json(trunks)
    }
}

export { SendTrunksController }