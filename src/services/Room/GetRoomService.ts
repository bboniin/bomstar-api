import prismaClient from '../../prisma'

interface RoomRequest {
    room_id: string;
}

class GetRoomService {
    async execute({ room_id }: RoomRequest) {

        const room = await prismaClient.room.findUnique({
            where: {
                id: room_id
            },
            include: {
                room_actions: true,
                room_trunks: true
            }
        })

        if (!room) {
            throw new Error("Sala não encontrada")
        }

        return room
    }
}

export { GetRoomService }