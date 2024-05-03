import { Request, Response } from 'express';
import { EditPostService } from '../../services/Post/EditPostService';

class EditPostController {
    async handle(req: Request, res: Response) {
        
        const { title, text } = req.body

        const { post_id } = req.params

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editPostService = new EditPostService

        const post = await editPostService.execute({
            title, text, post_id, photo
        })

        if (post["photo"]) {
            post["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + post["photo"];
        }

        return res.json(post)
    }
}

export { EditPostController }