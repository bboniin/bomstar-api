import prismaClient from '../../prisma'

interface UserRequest {
    page: number;
    all: boolean;
}

class ListUsersService {
    async execute({ page, all }: UserRequest) {

        let filter = {
            where: {
                status: "aprovado"
            }
        }

        if (!all) {
            filter["skip"] = page * 30
            filter["take"] = 30
        }
        console.log(1)

        const usersTotal = await prismaClient.user.count(filter)

        console.log(2)
        const users = await prismaClient.user.findMany({
            ...filter,
            orderBy: {
                created_at: "asc"
            }
        })

        console.log(3)
        console.log({users, usersTotal})
        return ({users, usersTotal})
    }
}

export { ListUsersService }