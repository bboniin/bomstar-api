import { Request, Response } from 'express';
import { CreatePostService } from '../../services/Post/CreatePostService';

class CreatePostController {
    async handle(req: Request, res: Response) {
        
        const { title, text } = req.body
        
        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        let admin_id = req.userId

        const createPostService = new CreatePostService

        const post = await createPostService.execute({
            title, text, admin_id, photo
        })

        return res.json(post)
    }
}

export { CreatePostController }