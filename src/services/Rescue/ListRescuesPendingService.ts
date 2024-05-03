import prismaClient from '../../prisma'

interface RescueRequest {
    page: number;
}

class ListRescuesPendingService {
    async execute({ page }: RescueRequest) {

        const rescuesTotal = await prismaClient.rescue.count({
            where: {
                status: "pendente"
            },
        })

        const rescues = await prismaClient.rescue.findMany({
            where: {
                status: "pendente"
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "asc"
            },
            include: {
                user: true,
                product: true,
            }
        })

        return ({rescues, rescuesTotal})
    }
}

export { ListRescuesPendingService }