import prismaClient from '../../prisma'

interface UserRequest {
    user_id: string;
}

class AdminGetUserService {
    async execute({ user_id}: UserRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            },
            select: {
                name: true,
                email: true,
                phone_number: true,
                points: true,
                points_interactions: true,
                birthday: true,
                photo: true,
                room: true,
                room_id: true,
                transactions: true,
                actions: true
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        return (user)
    }
}

export { AdminGetUserService }