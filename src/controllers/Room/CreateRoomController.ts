import { Request, Response } from 'express';
import { CreateRoomService } from '../../services/Room/CreateRoomService';

class CreateRoomController {
    async handle(req: Request, res: Response) {
        const { name, observation } = req.body
        
        const createRoomService = new CreateRoomService

        const room = await createRoomService.execute({
            name, observation
        })

        return res.json(room)
    }
}

export { CreateRoomController }