import prismaClient from '../../prisma'

interface ActionRequest {
    page: number;
}

class ListActionsPendingService {
    async execute({ page }: ActionRequest) {

        const actionsTotal = await prismaClient.action.count({
            where: {
                status: "pendente"
            },
        })

        const actions = await prismaClient.action.findMany({
            where: {
                status: "pendente"
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "asc"
            }
        })

        return {actions, actionsTotal}
    }
}

export { ListActionsPendingService }