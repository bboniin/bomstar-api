import { Request, Response } from 'express';
import { UpdateStatusRescueService } from '../../services/Rescue/UpdateStatusRescueService';

class UpdateStatusRescueController {
    async handle(req: Request, res: Response) {
        const { status, observation } = req.body

        const { rescue_id } = req.params

        const updateStatusRescueService = new UpdateStatusRescueService

        const rescue = await updateStatusRescueService.execute({
            status, rescue_id, observation
        })

        return res.json(rescue)
    }
}

export { UpdateStatusRescueController }