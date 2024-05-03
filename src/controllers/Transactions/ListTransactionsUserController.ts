import { Request, Response } from 'express';
import { ListTransactionsUserService } from '../../services/Transactions/ListTransactionsUserService';

class ListTransactionsUserController {
    async handle(req: Request, res: Response) {

        const { page } = req.query

        let user_id = req.userId

        const listTransactionsUserService = new ListTransactionsUserService

        const transactions = await listTransactionsUserService.execute({
            page: Number(page) > 0 ? Number(page) : 0, user_id
        })

        transactions.transactions.map((item) => {
            if (item.user["photo"]) {
                item.user["photo_url"] = "https://bomstar-data.s3.sa-east-1.amazonaws.com/" + item.user["photo"];
            }
        })

        return res.json(transactions)
    }
}

export { ListTransactionsUserController }