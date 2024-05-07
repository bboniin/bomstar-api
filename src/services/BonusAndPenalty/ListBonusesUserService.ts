import prismaClient from '../../prisma'

interface InteractionRequest {
    page: number;
    user_id: string;
}

class ListBonusesUserService {
    async execute({ page, user_id }: InteractionRequest) {

        const bonusesTotal = await prismaClient.bonus.count({
            where: {
                user_id: user_id,
            },
        })

        const bonuses = await prismaClient.bonus.findMany({
            where: {
                user_id: user_id,
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                updated_at: "desc"
            },
        })

        return {bonuses, bonusesTotal}
    }
}

export { ListBonusesUserService }