import { Request, Response } from 'express';
import { GetPostService } from '../../services/Post/GetPostService';

class GetPostController {
    async handle(req: Request, res: Response) {

        const { post_id } = req.params

        const getPostService = new GetPostService

        const post = await getPostService.execute({
            post_id
        })

        if (post["image"]) {
            post["image_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + post["image"];
        }

        return res.json(post)
    }
}

export { GetPostController }