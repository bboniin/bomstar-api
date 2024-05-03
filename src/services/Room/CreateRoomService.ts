import prismaClient from '../../prisma'

interface RoomRequest {
    name: string;
    observation: string;
    is_social: boolean;
}

class CreateRoomService {
    async execute({ name, observation, is_social }: RoomRequest) {

        if (!name) {
            throw new Error("Nome da Sala é obrigatório")
        }

        const room = await prismaClient.room.create({
            data: {
                name: name,
                is_social: is_social,
                observation: observation
            }
        })

        return (room)
    }
}

export { CreateRoomService }