import prismaClient from '../../prisma'

interface RoomRequest {
    name: string;
    room_id: string;
    observation: string;
    is_social: boolean;
}

class EditRoomService {
    async execute({ name, room_id, is_social, observation }: RoomRequest) {

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
                is_social: is_social,
                observation: observation
            },
        })

        return (roomEdit)
    }
}

export { EditRoomService }