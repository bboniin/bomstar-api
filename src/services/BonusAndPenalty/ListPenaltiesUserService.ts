import prismaClient from '../../prisma'

interface InteractionRequest {
    page: number;
    user_id: string;
}

class ListPenaltiesUserService {
    async execute({ page, user_id }: InteractionRequest) {

        const penaltiesTotal = await prismaClient.penalty.count({
            where: {
                user_id: user_id,
            },
        })

        const penalties = await prismaClient.penalty.findMany({
            where: {
                user_id: user_id,
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                updated_at: "desc"
            },
        })

        return {penalties, penaltiesTotal}
    }
}

export { ListPenaltiesUserService }