import { Request, Response } from 'express';
import { ListPostsService } from '../../services/Post/ListPostsService';

class ListPostsController {
    async handle(req: Request, res: Response) {

        const { page, home } = req.query

        const listPostsService = new ListPostsService

        const post = await listPostsService.execute({
            page: Number(page) > 0 ? Number(page) : 0, home: home == "true"
        })

        post.posts.map((item) => {
            if (item["photo"]) {
                item["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item["photo"];
            }
            if (item.admin["photo"]) {
                item.admin["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.admin["photo"];
            }
        })

        return res.json(post)
    }
}

export { ListPostsController }