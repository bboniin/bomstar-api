import { Request, Response } from 'express';
import { EditPostService } from '../../services/Post/EditPostService';

class EditPostController {
    async handle(req: Request, res: Response) {
        
        const { title, text } = req.body

        const { post_id } = req.params

        let image = ""

        if (req.file) {
            image = req.file.filename
        }

        const editPostService = new EditPostService

        const post = await editPostService.execute({
            title, text, post_id, image
        })

        if (post["image"]) {
            post["image_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + post["image"];
        }

        return res.json(post)
    }
}

export { EditPostController }