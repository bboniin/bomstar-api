import prismaClient from '../../prisma'

interface UserRequest {
    page: number;
}

class ListUsersPendingService {
    async execute({ page }: UserRequest) {

        const usersTotal = await prismaClient.user.count({
            where: {
                status: "pendente"
            },
        })

        const users = await prismaClient.user.findMany({
            where: {
                status: "pendente"
            },
            skip: page * 30,
            take: 30,
            orderBy: {
                created_at: "asc"
            }
        })

        return ({users, usersTotal})
    }
}

export { ListUsersPendingService }