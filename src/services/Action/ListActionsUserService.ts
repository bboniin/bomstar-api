import prismaClient from '../../prisma'

interface ActionRequest {
    page: number;
    user_id: string;
}

class ListActionsUserService {
    async execute({ page, user_id }: ActionRequest) {

        const actionsTotal = await prismaClient.action.count({
            where: {
                user_id: user_id,
                status: "pendente"
            },
        })

        const actions = await prismaClient.action.findMany({
            where: {
                user_id: user_id,
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

export { ListActionsUserService }