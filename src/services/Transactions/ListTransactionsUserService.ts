import prismaClient from '../../prisma'

interface TransactionRequest {
    page: number;
    user_id: string;
}

class ListTransactionsUserService {
    async execute({ page, user_id}: TransactionRequest) {

        const transactionsTotal = await prismaClient.transaction.count({
            where: {
                user_id: user_id
            }
        })

        const transactions = await prismaClient.transaction.findMany({
            where: {
                user_id: user_id
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true
            }
        })

        return ({transactions, transactionsTotal})
    }
}

export { ListTransactionsUserService }