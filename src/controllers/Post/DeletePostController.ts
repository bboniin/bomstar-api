import { Request, Response } from 'express';
import { DeletePostService } from '../../services/Post/DeletePostService';

class DeletePostController {
    async handle(req: Request, res: Response) {

        const { post_id } = req.params

        const deletePostService = new DeletePostService

        const post = await deletePostService.execute({
            post_id
        })

        return res.json(post)
    }
}

export { DeletePostController }