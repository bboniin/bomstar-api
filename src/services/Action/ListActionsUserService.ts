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
            },
        })

        const actions = await prismaClient.action.findMany({
            where: {
                user_id: user_id,
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                updated_at: "desc"
            },
            include: {
                user: true
            }
        })

        return {actions, actionsTotal}
    }
}

export { ListActionsUserService }