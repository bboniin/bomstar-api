import prismaClient from '../../prisma'

interface RescueRequest {
    page: number;
    user_id: string;
}

class ListRescuesUserService {
    async execute({ page, user_id}: RescueRequest) {

        const rescuesTotal = await prismaClient.rescue.count({
            where: {
                user_id: user_id
            }
        })

        const rescues = await prismaClient.rescue.findMany({
            where: {
                user_id: user_id
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true,
                product: true,
            }
        })

        return ({rescues, rescuesTotal})
    }
}

export { ListRescuesUserService }