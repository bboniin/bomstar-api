import prismaClient from '../../prisma'

interface RoomRequest {
    name: string;
    room_id: string;
    observation: string;
}

class EditRoomService {
    async execute({ name, room_id, observation }: RoomRequest) {

        if (!room_id || !name) {
            throw new Error("Id e Nome da Sala são obrigatórios")
        }

        const room = await prismaClient.room.findFirst({
            where: {
                id: room_id,
            }
        })

        if (!room) {
            throw new Error("Sala não encontrada")
        }


        const roomEdit = await prismaClient.room.update({
            where: {
                id: room_id,
            },
            data: {
                name: name,
                observation: observation
            },
        })

        return (roomEdit)
    }
}

export { EditRoomService }