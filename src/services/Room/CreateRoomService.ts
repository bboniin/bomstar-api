import prismaClient from '../../prisma'

interface RoomRequest {
    name: string;
    observation: string;
}

class CreateRoomService {
    async execute({ name, observation }: RoomRequest) {

        if (!name) {
            throw new Error("Nome da Sala é obrigatório")
        }

        const room = await prismaClient.room.create({
            data: {
                name: name,
                observation: observation
            }
        })

        return (room)
    }
}

export { CreateRoomService }