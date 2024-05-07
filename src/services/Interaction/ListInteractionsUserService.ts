import prismaClient from '../../prisma'

interface InteractionRequest {
    page: number;
    user_id: string;
}

class ListInteractionsUserService {
    async execute({ page, user_id }: InteractionRequest) {

        const interactionsTotal = await prismaClient.interaction.count({
            where: {
                OR: [{
                        user_send_id: user_id,
                    }, {
                        user_receive_id: user_id,
                    }]
            },
        })

        const interactions = await prismaClient.interaction.findMany({
            where: {
                OR: [{
                        user_send_id: user_id,
                    }, {
                        user_receive_id: user_id,
                    }]
            },
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

export { ListInteractionsUserService }