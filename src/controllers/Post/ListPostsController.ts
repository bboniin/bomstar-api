import { Request, Response } from 'express';
import { ListPostsService } from '../../services/Post/ListPostsService';

class ListPostsController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listPostsService = new ListPostsService

        const post = await listPostsService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        if (post["image"]) {
            post["image_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + post["image"];
        }

        return res.json(post)
    }
}

export { ListPostsController }