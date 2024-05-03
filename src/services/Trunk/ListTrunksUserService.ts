import prismaClient from '../../prisma'

interface TrunkRequest {
    user_id: string;
}

class ListTrunksUserService {
    async execute({ user_id }: TrunkRequest) {

        const trunksOpenTotal = await prismaClient.trunk.count({
            where: {
                user_id: user_id,
                open: false
            }
        })

        const trunks = await prismaClient.trunk.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                created_at: "asc"
            }
        })

        return ({trunks, trunksOpenTotal})
    }
}

export { ListTrunksUserService }