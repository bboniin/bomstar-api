import prismaClient from '../../prisma'

interface UserRequest {
    user_id: string;
}

class GetUserService {
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
                birthday: true,
                status: true,
                observation: true,
                room_id: true,
                photo: true,
                trunks: true
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        return (user)
    }
}

export { GetUserService }