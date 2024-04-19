import { Request, Response } from 'express';
import { CreateAdminService } from '../../services/Admin/CreateAdminService';

class CreateAdminController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let user_id = req.userId

        const createAdminService = new CreateAdminService

        const admin = await createAdminService.execute({
            name, email, password, photo, user_id: user_id
        })

        return res.json(admin)
    }
}

export { CreateAdminController }