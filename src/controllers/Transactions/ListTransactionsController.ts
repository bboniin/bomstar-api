import { Request, Response } from 'express';
import { ListTransactionsService } from '../../services/Transactions/ListTransactionsService';

class ListTransactionsController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        const listTransactionsService = new ListTransactionsService

        const transactions = await listTransactionsService.execute({
            page: Number(page) > 0 ? Number(page) : 0
        })

        transactions.transactions.map((item) => {
            if (item.user["photo"]) {
                item.user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user["photo"];
            }
        })

        return res.json(transactions)
    }
}

export { ListTransactionsController }