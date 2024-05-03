import prismaClient from '../../prisma'

interface RescueRequest {
    page: number;
}

class ListRescuesService {
    async execute({ page }: RescueRequest) {

        const rescuesTotal = await prismaClient.rescue.count()

        const rescues = await prismaClient.rescue.findMany({
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

export { ListRescuesService }