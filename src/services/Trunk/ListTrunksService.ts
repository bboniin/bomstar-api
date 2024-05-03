import prismaClient from '../../prisma'

interface TrunkRequest {
    page: number;
    type: string;
}

class ListTrunksService {
    async execute({ page, type }: TrunkRequest) {
        let where = {}
        if (type == "open") {
            where["open"] = true
        }
        if (type == "close") {
            where["open"] = false
        }

        const trunksTotal = await prismaClient.trunk.count()

        const trunksOpenTotal = await prismaClient.trunk.count({
            where: {
                open: true
            }
        })

        const trunks = await prismaClient.trunk.findMany({
            where: where,
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "asc"
            },
            include: {
                user: true,
            }
        })

        return ({trunks, trunksTotal, trunksOpenTotal})
    }
}

export { ListTrunksService }