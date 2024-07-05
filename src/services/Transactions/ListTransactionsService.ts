import prismaClient from '../../prisma'

interface TransactionRequest {
    page: number;
}

class ListTransactionsService {
    async execute({ page }: TransactionRequest) {

        const transactionsTotal = await prismaClient.transaction.count()

        const transactions = await prismaClient.transaction.findMany({
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true,
            }
        })

        return ({transactions, transactionsTotal})
    }
}

export { ListTransactionsService }