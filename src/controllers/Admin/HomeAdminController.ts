import { Request, Response } from 'express';
import { HomeAdminService } from '../../services/Admin/HomeAdminService';

class HomeAdminController {
    async handle(req: Request, res: Response) {

        const homeAdminService = new HomeAdminService

        const admin = await homeAdminService.execute()

        return res.json(admin)
    }
}

export { HomeAdminController }