import { Request, Response } from 'express';
import { ListTrunksUserService } from '../../services/Trunk/ListTrunksUserService';

class ListTrunksUserController {
    async handle(req: Request, res: Response) {

        const user_id = req.userId

        const listTrunksUserService = new ListTrunksUserService

        const trunks = await listTrunksUserService.execute({
            user_id: user_id
        })


        return res.json(trunks)
    }
}

export { ListTrunksUserController }