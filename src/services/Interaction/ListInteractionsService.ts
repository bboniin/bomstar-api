import prismaClient from '../../prisma'

interface InteractionRequest {
    page: number;
}

class ListInteractionsService {
    async execute({ page }: InteractionRequest) {

        const interactionsTotal = await prismaClient.interaction.count()

        const interactions = await prismaClient.interaction.findMany({
            skip: page * 30,
            take: 30,
            orderBy: {
                updated_at: "desc"
            },
            include: {
                user_receive: true,
                user_send: true,
            }
        })

        return {interactions, interactionsTotal}
    }
}

export { ListInteractionsService }