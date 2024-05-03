import { Request, Response } from 'express';
import { ListTrunksService } from '../../services/Trunk/ListTrunksService';

class ListTrunksController {
    async handle(req: Request, res: Response) {

        const { page, type } = req.query

        const listTrunksService = new ListTrunksService

        const trunks = await listTrunksService.execute({
            page: Number(page) > 0 ? Number(page) : 0, type: String(type)
        })

        trunks.trunks.map((item) => {
            if (item.user["photo"]) {
                item.user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user["photo"];
            }
        })

        return res.json(trunks)
    }
}

export { ListTrunksController }